jest.mock('./video_creator.service', () => ({
  __esModule: true,
  default: jest.fn()
}))
import ProposalCreatorService from './proposal_creator.service'
import crypto from 'crypto'
import VideoCreatorService from './video_creator.service'
import db from '../models'

const MockedVCS = VideoCreatorService as jest.Mock
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

      if (res.success) throw new Error('Expected failure')
      expect(res.error.message).toEqual('Search Session not found')
    })
  })

  describe('when search session exist', () => {
    let searchSession: Awaited<ReturnType<typeof SearchSession.create>>
    let title: Awaited<ReturnType<typeof Title.create>>

    beforeEach(async () => {
      searchSession = await SearchSession.create()
      title = await Title.create({ tconst: `tt${crypto.randomBytes(4).toString('hex')}` })
    })

    describe('when everythig goes fine', () => {
      beforeEach(async () => {
        MockedVCS.mockImplementation(() => {
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

        if (!res.success) throw new Error('Expected success')
        expect(res.body).toBeInstanceOf(Proposal)
        expect(res.body.search_session_uuid).not.toBeNull()
      })
    })

    describe('when trailer video cannot be retrieved', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => {
          return {
            perform: () => {
              return { success: false, error: new Error('Oops') }
            }
          }
        })
      })

      test('returns success false', async () => {
        const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid, title.tconst)
        const res = await proposalCreatorServiceInstance.perform()

        expect(res.success).toBe(false)
      })

      test('returns an error', async () => {
        const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid, title.tconst)
        const res = await proposalCreatorServiceInstance.perform()

        if (res.success) throw new Error('Expected failure')
        expect(res.error.message).toEqual('Oops')
      })
    })
  })
})
