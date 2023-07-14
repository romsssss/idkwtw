const VideoCreatorService = require('../../src/services/video_creator.service')
const db = require('../models')
const { Op } = require('sequelize')
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
      const searchSession = await this.#searchSession()

      if (!searchSession) { throw new Error('Search Session not found') }

      let attempts = 0
      let title = null
      let videoCreatorServiceRes = null
      do {
        attempts += 1
        title = await this.#pickTitle(searchSession)
        if (!title.video) {
          const videoCreatorServiceInstance = new VideoCreatorService(title.tconst)
          videoCreatorServiceRes = await videoCreatorServiceInstance.perform()
        }
      } while (!this.tconst && attempts <= 10 && !videoCreatorServiceRes.success)

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

  async #pickTitle (searchSession) {
    if (this.tconst) {
      return await Title.findByPk(this.tconst, { include: Video })
    } else {
      const where = this.#titleFilters(searchSession)
      return await Title.findOne({ where, order: db.sequelize.random(), include: Video })
    }
  }

  #minimalStartYear (searchSession) {
    const tooOldYears = searchSession.proposals.filter(p => p.rejected_feedback === 'too_old' && p.title?.start_year).map(p => p.title.start_year)
    return tooOldYears.length <= 0 ? null : Math.min.apply(null, tooOldYears)
  }

  #maximalRuntime (searchSession) {
    const tooLongRuntimes = searchSession.proposals.filter(p => p.rejected_feedback === 'too_long' && p.title?.runtime_minutes).map(p => p.title.runtime_minutes)
    return tooLongRuntimes.length <= 0 ? null : Math.max.apply(null, tooLongRuntimes)
  }

  #titleFilters (searchSession) {
    const minimalStartYear = this.#minimalStartYear(searchSession)
    const maximalRuntime = this.#maximalRuntime(searchSession)
    const where = {}

    if (minimalStartYear) {
      where.start_year = { [Op.gt]: minimalStartYear }
    }

    if (maximalRuntime) {
      where.runtime_minutes = { [Op.lt]: maximalRuntime }
    }

    if (searchSession.genres) {
      where.genres = { [Op.overlap]: searchSession.genres }
    }

    return where
  }

  async #searchSession () {
    return await SearchSession.findByPk(this.searchSessionUUID, { include: [{ model: Proposal, include: Title }] })
  }
}

module.exports = ProposalCreatorService
