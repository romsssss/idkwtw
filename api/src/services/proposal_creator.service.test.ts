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

    describe('when scenario is kids', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => ({
          perform: () => ({ success: true, body: {} })
        }))
      })

      test('excludes titles with excluded genres even if they match selected genres', async () => {
        await Title.destroy({ where: { tconst: title.tconst } })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama', 'Horror'],
          is_adult: false,
          runtime_minutes: 90
        })
        const kidsSession = await SearchSession.create({
          public: 'kids',
          genres: ['Drama']
        })

        const service = new ProposalCreatorService(kidsSession.uuid)
        const res = await service.perform()

        if (res.success) throw new Error('Expected failure')
        expect(res.error.message).toEqual('No title available')
      })

      test('returns family-friendly titles', async () => {
        await Title.destroy({ where: { tconst: title.tconst } })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Animation', 'Family'],
          is_adult: false,
          runtime_minutes: 90
        })
        const kidsSession = await SearchSession.create({
          public: 'kids',
          genres: ['Animation']
        })

        const service = new ProposalCreatorService(kidsSession.uuid)
        const res = await service.perform()

        expect(res.success).toBe(true)
      })
    })

    describe('when scenario is date with explicit Horror genre', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => ({
          perform: () => ({ success: true, body: {} })
        }))
      })

      test('user-selected genre overrides scenario exclusion', async () => {
        await Title.destroy({ where: { tconst: title.tconst } })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Horror'],
          is_adult: false,
          runtime_minutes: 120
        })
        const dateSession = await SearchSession.create({
          public: 'date',
          genres: ['Horror']
        })

        const service = new ProposalCreatorService(dateSession.uuid)
        const res = await service.perform()

        expect(res.success).toBe(true)
      })
    })

    describe('when all titles have already been proposed', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => ({
          perform: () => ({ success: true, body: {} })
        }))
      })

      test('does not re-propose the same title', async () => {
        await Title.destroy({ where: {} })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 1000
        })
        const session = await SearchSession.create({
          public: 'alone',
          genres: ['Drama']
        })

        // First proposal succeeds
        const service1 = new ProposalCreatorService(session.uuid)
        const res1 = await service1.perform()
        expect(res1.success).toBe(true)

        // Second proposal fails — only title already proposed
        const service2 = new ProposalCreatorService(session.uuid)
        const res2 = await service2.perform()

        if (res2.success) throw new Error('Expected failure')
        expect(res2.error.message).toEqual('No title available')
      })
    })

    describe('when a title is rejected as too_violent', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => ({
          perform: () => ({ success: true, body: {} })
        }))
      })

      test('excludes action genres from future proposals', async () => {
        await Title.destroy({ where: {} })
        const actionTitle = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Action'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 1000
        })
        const dramaTitle = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 1000
        })
        const session = await SearchSession.create({
          public: 'alone',
          genres: ['Action', 'Drama']
        })

        // First proposal: force the action title, then reject as too_violent
        const service1 = new ProposalCreatorService(session.uuid, actionTitle.tconst)
        await service1.perform()
        await Proposal.update(
          { accepted: false, rejected_feedback: 'too_violent' },
          { where: { search_session_uuid: session.uuid, tconst: actionTitle.tconst } }
        )

        // Second proposal: should get the drama title (Action excluded by feedback)
        const service2 = new ProposalCreatorService(session.uuid)
        const res2 = await service2.perform()

        expect(res2.success).toBe(true)
        if (!res2.success) throw new Error('Expected success')
        expect(res2.body.tconst).toEqual(dramaTitle.tconst)
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
