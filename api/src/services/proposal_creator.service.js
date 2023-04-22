const db = require('../models')
const Proposal = db.proposals
const SearchSession = db.search_sessions
const Title = db.titles

class ProposalCreatorService {
  constructor (searchSessionUUID) {
    this.searchSessionUUID = searchSessionUUID
  }

  async perform () {
    try {
      const searchSession = await SearchSession.findByPk(this.searchSessionUUID)

      if (!searchSession) { throw new Error('Search Session not found') }

      const title = await Title.findOne({ order: db.sequelize.random() })

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

  async #searchSession () {
    return await SearchSession.findByPk(this.searchSessionUUID)
  }

  async #proposalParams () {
    return {
      tconst: 'tt13683364',
      search_session_uuid: await this.#searchSession().uuid
    }
  }
}

module.exports = ProposalCreatorService
