const VideoCreatorService = require('../../src/services/video_creator.service')
const db = require('../models')
const Proposal = db.proposals
const SearchSession = db.search_sessions
const Title = db.titles
const Video = db.videos

class ProposalCreatorService {
  constructor (searchSessionUUID) {
    this.searchSessionUUID = searchSessionUUID
  }

  async perform () {
    try {
      const searchSession = await SearchSession.findByPk(this.searchSessionUUID)

      if (!searchSession) { throw new Error('Search Session not found') }

      const title = await this._pickTitle()
      if (!title.video) {
        const videoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const serviceRes = await videoCreatorServiceInstance.perform()
        if (!serviceRes.success) { throw serviceRes.error }
      }

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
    return await Title.findOne({ order: db.sequelize.random(), include: Video })
    // return await Title.findByPk('tt0137523', { include: Video })
  }
}

module.exports = ProposalCreatorService
