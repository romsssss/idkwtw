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

    describe('when a liked director boosts future proposals', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => ({
          perform: () => ({ success: true, body: {} })
        }))
      })

      test('does not crash when director identifier is used in order clause', async () => {
        await Title.destroy({ where: {} })
        const seenTitle = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          directors: ['nm0000001'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 1000
        })
        const newTitle = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          directors: ['nm0000001'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 1000
        })
        const session = await SearchSession.create({
          public: 'alone',
          genres: ['Drama']
        })

        // Mark seenTitle as already seen and liked (to trigger director boost)
        const service1 = new ProposalCreatorService(session.uuid, seenTitle.tconst)
        await service1.perform()
        await Proposal.update(
          { already_seen: true, already_seen_feedback: 'liked' },
          { where: { search_session_uuid: session.uuid, tconst: seenTitle.tconst } }
        )

        // Second proposal should use the director boost without SQL errors
        const service2 = new ProposalCreatorService(session.uuid)
        const res2 = await service2.perform()

        expect(res2.success).toBe(true)
        if (!res2.success) throw new Error('Expected success')
        expect(res2.body.tconst).toEqual(newTitle.tconst)
      })
    })

    describe('popularity weighting', () => {
      beforeEach(() => {
        MockedVCS.mockImplementation(() => ({
          perform: () => ({ success: true, body: {} })
        }))
      })

      // Draw repeatedly from a fresh session each time so the already-proposed filter never
      // narrows the pool, and count how often the popular title comes back.
      async function drawShare(popularTconst: string, draws: number, exitFeedback?: 'dont_know_movies') {
        let popularPicks = 0

        for (let i = 0; i < draws; i++) {
          const session = await SearchSession.create({
            public: 'alone',
            genres: ['Drama'],
            ...(exitFeedback ? { exit_feedback: exitFeedback } : {})
          })
          const res = await new ProposalCreatorService(session.uuid).perform()

          if (!res.success) throw new Error('Expected success')
          if (res.body.tconst === popularTconst) popularPicks += 1
        }

        return popularPicks / draws
      }

      async function seedPair() {
        await Title.destroy({ where: {} })
        const popular = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 1_000_000
        })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 50
        })
        return popular
      }

      test('favours the widely-rated title over the obscure one', async () => {
        const popular = await seedPair()

        // weight ratio is sqrt(1000000)/sqrt(50) ~= 141:1, so the popular title should
        // dominate. A loose bound keeps this from flaking on the randomness.
        expect(await drawShare(popular.tconst, 30)).toBeGreaterThan(0.8)
      })

      test('still reaches the less popular title at the base exponent', async () => {
        await Title.destroy({ where: {} })
        const popular = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 200_000
        })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.5,
          num_votes: 20_000
        })

        // A 10x vote gap becomes a ~3.2:1 weight ratio at alpha 0.5, so the quieter title
        // should still surface roughly a quarter of the time.
        expect(await drawShare(popular.tconst, 40)).toBeLessThan(0.98)
      })

      // The exponent ramp is deterministic, so assert it directly rather than inferring it
      // from a sampling distribution.
      describe('popularity exponent', () => {
        const alphaFor = (exitFeedback: string | null, skips: number) => {
          const service = new ProposalCreatorService('irrelevant-uuid')
          const proposals = Array.from({ length: skips }, () => ({
            accepted: false,
            already_seen: false
          }))
          return service['popularityAlpha']({ exit_feedback: exitFeedback, proposals })
        }

        test('stays at the base value without dont_know_movies feedback', () => {
          expect(alphaFor(null, 6)).toEqual(0.5)
          expect(alphaFor('just_browsing', 6)).toEqual(0.5)
        })

        test('jumps to the boosted value when the feedback arrives', () => {
          expect(alphaFor('dont_know_movies', 4)).toEqual(0.75)
        })

        test('ramps further on each subsequent skip, up to the cap', () => {
          expect(alphaFor('dont_know_movies', 5)).toBeCloseTo(0.8)
          expect(alphaFor('dont_know_movies', 6)).toBeCloseTo(0.85)
          expect(alphaFor('dont_know_movies', 20)).toEqual(0.9)
        })

        test('ignores already-seen proposals when counting skips', () => {
          const service = new ProposalCreatorService('irrelevant-uuid')
          const alpha = service['popularityAlpha']({
            exit_feedback: 'dont_know_movies',
            proposals: [
              ...Array.from({ length: 4 }, () => ({ accepted: false, already_seen: false })),
              ...Array.from({ length: 5 }, () => ({ accepted: false, already_seen: true }))
            ]
          })

          expect(alpha).toEqual(0.75)
        })
      })

      test('leans harder on popularity after dont_know_movies feedback', async () => {
        const popular = await seedPair()

        expect(await drawShare(popular.tconst, 40, 'dont_know_movies')).toBeGreaterThan(0.9)
      })

      test('prefers the better rated title when popularity is equal', async () => {
        await Title.destroy({ where: {} })
        const acclaimed = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 9.0,
          num_votes: 100_000
        })
        await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false,
          average_rating: 7.1,
          num_votes: 100_000
        })

        // weight ratio is (9.0 - 6.5) / (7.1 - 6.5) ~= 4:1
        expect(await drawShare(acclaimed.tconst, 40)).toBeGreaterThan(0.5)
      })

      test('picks a title with null rating and votes rather than skipping it', async () => {
        await Title.destroy({ where: {} })
        const bare = await Title.create({
          tconst: `tt${crypto.randomBytes(4).toString('hex')}`,
          genres: ['Drama'],
          is_adult: false
        })
        const session = await SearchSession.create({ public: 'alone', genres: ['Drama'] })

        const res = await new ProposalCreatorService(session.uuid).perform()

        expect(res.success).toBe(true)
        if (!res.success) throw new Error('Expected success')
        expect(res.body.tconst).toEqual(bare.tconst)
      })
    })

    describe('when title already has a video in the database', () => {
      beforeEach(async () => {
        const Video = db.videos
        await Video.create({
          tconst: title.tconst,
          name: 'Official Trailer',
          type: 'trailer',
          site: 'youtube',
          key: 'abc123',
          size: 1080,
          official: true,
          iso_639_1: 'en',
          iso_3166_1: 'US',
          published_at: new Date()
        })
        MockedVCS.mockImplementation(() => {
          throw new Error('VideoCreatorService should not be called')
        })
      })

      test('returns success true without calling VideoCreatorService', async () => {
        const service = new ProposalCreatorService(searchSession.uuid)
        const res = await service.perform()

        expect(res.success).toBe(true)
        expect(MockedVCS).not.toHaveBeenCalled()
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
