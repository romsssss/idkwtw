const ProposalCreatorService = require('../../src/services/proposal_creator.service')
const crypto = require('crypto')
const VideoCreatorService = require('../../src/services/video_creator.service')
jest.mock('../../src/services/video_creator.service')
const db = require('../../src/models')
const SearchSession = db.search_sessions
const Proposal = db.proposals
const Title = db.titles

describe('#perform', () => {
  describe('when search session does not exist', () => {
    const unknownSearchSessionUUID = '00000000-0000-0000-0000-000000000000'

    test('returns success false', async () => {
      const proposalCreatorServiceInstance = new ProposalCreatorService(unknownSearchSessionUUID)
      const res = await proposalCreatorServiceInstance.perform()

      expect(res.success).toBe(false)
    })

    test('returns an error message', async () => {
      const proposalCreatorServiceInstance = new ProposalCreatorService(unknownSearchSessionUUID)
      const res = await proposalCreatorServiceInstance.perform()

      expect(res.error.message).toEqual('Search Session not found')
    })
  })

  describe('when search session exist', () => {
    let searchSession

    beforeEach(async () => {
      searchSession = await SearchSession.create()
      await Title.create({ tconst: `tt${crypto.randomBytes(4).toString('hex')}` })
    })

    describe('when everythig goes fine', () => {
      beforeEach(async () => {
        VideoCreatorService.mockImplementation(() => {
          return {
            perform: () => {
              return { success: true, body: {} }
            }
          }
        })
      })

      test('returns success true', async () => {
        const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
        const res = await proposalCreatorServiceInstance.perform()

        expect(res.success).toBe(true)
      })

      test('returns a new proposal instance', async () => {
        const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
        const res = await proposalCreatorServiceInstance.perform()

        expect(res.body).toBeInstanceOf(Proposal)
        expect(res.body.search_session_uuid).not.toBeNull()
      })
    })

    describe('when trailer video cannot be retrieved', () => {
      beforeEach(() => {
        VideoCreatorService.mockImplementation(() => {
          return {
            perform: () => {
              return { success: false, error: new Error('Oops') }
            }
          }
        })
      })

      test('returns success false', async () => {
        const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
        const res = await proposalCreatorServiceInstance.perform()

        expect(res.success).toBe(false)
      })

      test('returns an error', async () => {
        const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
        const res = await proposalCreatorServiceInstance.perform()

        expect(res.error.message).toEqual('Oops')
      })
    })
  })
})
