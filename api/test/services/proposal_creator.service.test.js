const ProposalCreatorService = require('../../src/services/proposal_creator.service')
const db = require('../../src/models')
const SearchSession = db.search_sessions
const Proposal = db.proposals

describe('#perform', () => {
  describe('when search session does not exist', () => {
    const unknownSearchSessionUUID = '00000000-0000-0000-0000-000000000000'

    test('returns success false', async () => {
      const ProposalCreatorServiceInstance = new ProposalCreatorService(unknownSearchSessionUUID)
      const res = await ProposalCreatorServiceInstance.perform()

      expect(res.success).toBe(false)
    })

    test('returns an error message', async () => {
      const ProposalCreatorServiceInstance = new ProposalCreatorService(unknownSearchSessionUUID)
      const res = await ProposalCreatorServiceInstance.perform()

      expect(res.error.message).toEqual('Search Session not found')
    })
  })

  describe('when search session exist', () => {
    let searchSession

    beforeEach(async () => {
      searchSession = await SearchSession.create()
    })

    test('returns success true', async () => {
      const ProposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
      const res = await ProposalCreatorServiceInstance.perform()

      expect(res.success).toBe(true)
    })

    test('returns a new proposal instance', async () => {
      const ProposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
      const res = await ProposalCreatorServiceInstance.perform()

      expect(res.body).toBeInstanceOf(Proposal)
      expect(res.body.search_session_uuid).not.toBeNull()
    })
  })
})
