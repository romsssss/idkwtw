const VideoCreatorService = require('../../src/services/video_creator.service')
const db = require('../models')
const Proposal = db.proposals
const SearchSession = db.search_sessions
const Title = db.titles
const Video = db.videos

class ProposalCreatorService {
  constructor (searchSessionUUID, tconst = null) {
    this.searchSessionUUID = searchSessionUUID
    this.tconst = tconst
  }

  async perform () {
    try {
      const searchSession = await SearchSession.findByPk(this.searchSessionUUID)

      if (!searchSession) { throw new Error('Search Session not found') }

      let attempts = 0
      let title = null
      let videoCreatorServiceRes = null
      do {
        attempts += 1
        title = await this._pickTitle()
        if (!title.video) {
          const videoCreatorServiceInstance = new VideoCreatorService(title.tconst)
          videoCreatorServiceRes = await videoCreatorServiceInstance.perform()
        }
      } while (attempts <= 10 && !videoCreatorServiceRes.success)

      if (!videoCreatorServiceRes.success) { throw videoCreatorServiceRes.error }

      const proposalParams = {
        tconst: title.tconst,
        search_session_uuid: searchSession.uuid
      }
      const proposal = await Proposal.create(proposalParams, { include: SearchSession })

      return { success: true, body: proposal }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  async _pickTitle () {
    if (this.tconst) {
      return await Title.findByPk(this.tconst, { include: Video })
    } else {
      return await Title.findOne({ order: db.sequelize.random(), include: Video })
    }
  }
}

module.exports = ProposalCreatorService
