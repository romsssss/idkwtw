import VideoCreatorService from './video_creator.service'
import db from '../models'
import { Op, literal } from 'sequelize'
import { scenarioConfig } from './scenario_config'

const FEEDBACK_GENRE_EXCLUSIONS: Record<string, string[]> = {
  too_violent: ['Action', 'War', 'Crime'],
  too_scary: ['Horror', 'Thriller'],
}

// Titles are ranked by weighted random sampling, with the weight driven by num_votes.
// The exponent controls how strongly popularity biases the pick: at 0.5 roughly half the
// proposals are titles with 25k+ votes, at 0.75 around 80% are.
const BASE_ALPHA = 0.5
const BOOSTED_ALPHA = 0.75
const MAX_ALPHA = 0.9

// Mirrors EXIT_PROMPT_SKIP_THRESHOLD in front/src/views/ProposalView.vue: the number of
// skips after which the user is asked why they are not finding a pick.
const SKIP_PROMPT_THRESHOLD = 4

// Ratings are already filtered to > 7 at seed time, so anchoring below that floor keeps the
// multiplier a nudge (~6x spread) rather than a second filter.
const RATING_ANCHOR = 6.5

const Proposal = db.proposals
const SearchSession = db.search_sessions
const Title = db.titles
const Video = db.videos

interface ServiceSuccess {
  success: true
  body: InstanceType<typeof Proposal>
}

interface ServiceFailure {
  success: false
  error: Error | { message: string }
}

type ServiceResult = ServiceSuccess | ServiceFailure

class ProposalCreatorService {
  private searchSessionUUID: string
  private tconst: string | null

  constructor(searchSessionUUID: string, tconst: string | null = null) {
    this.searchSessionUUID = searchSessionUUID
    this.tconst = tconst
  }

  async perform(): Promise<ServiceResult> {
    try {
      const searchSession = await this.fetchSearchSession()

      if (!searchSession) { throw new Error('Search Session not found') }

      let attempts = 0
      let title: InstanceType<typeof Title> | null = null
      let videoCreatorServiceRes: { success: boolean; body?: unknown; error?: Error } | null = null
      do {
        attempts += 1
        title = await this.pickTitle(searchSession)

        if (!title) {
          return { success: false, error: { message: 'No title available' } }
        }

        if (!(title as unknown as { video?: unknown }).video) {
          const videoCreatorServiceInstance = new VideoCreatorService(title.tconst)
          videoCreatorServiceRes = await videoCreatorServiceInstance.perform()
        }
      } while (!this.tconst && attempts <= 10 && !((title as unknown as { video?: unknown }).video || videoCreatorServiceRes?.success))

      if (!(title as unknown as { video?: unknown }).video && !videoCreatorServiceRes?.success) {
        throw videoCreatorServiceRes?.error || new Error('No video found')
      }

      const proposalParams = {
        tconst: title.tconst,
        search_session_uuid: searchSession.uuid
      }
      const proposal = await Proposal.create(proposalParams as never, { include: [SearchSession] })

      return { success: true, body: proposal }
    } catch (err) {
      return { success: false, error: err as Error }
    }
  }

  private async pickTitle(searchSession: InstanceType<typeof SearchSession>): Promise<InstanceType<typeof Title> | null> {
    if (this.tconst) {
      return await Title.findByPk(this.tconst, { include: [Video] })
    } else {
      const where = this.titleFilters(searchSession)
      const likedDirs = this.likedDirectors(searchSession)
      const alpha = this.popularityAlpha(searchSession)

      let weightSql = `POWER(GREATEST(COALESCE(num_votes, 1), 1), ${alpha})`
        + ` * GREATEST(COALESCE(average_rating, 7) - ${RATING_ANCHOR}, 0.1)`
      if (likedDirs.length > 0) {
        const escapedDirs = likedDirs.map(d => db.sequelize.escape(d)).join(',')
        weightSql += ` * CASE WHEN "title"."directors" && ARRAY[${escapedDirs}]::varchar[] THEN 1.5 ELSE 1 END`
      }

      // Efraimidis-Spirakis weighted sampling: taking the smallest -LN(u) / weight draws a
      // title with probability proportional to its weight. `1 - random()` keeps u in (0, 1]
      // so LN is never handed a zero, which Postgres rejects.
      const orderSql = `-LN(1 - random()) / (${weightSql}) ASC`

      return await Title.findOne({ where, order: literal(orderSql), include: [Video] })
    }
  }

  private likedDirectors(searchSession: unknown): string[] {
    const ss = searchSession as { proposals: Array<{ already_seen_feedback: string | null; title?: { directors: string[] | null } }> }
    const directors = new Set<string>()
    for (const proposal of ss.proposals) {
      if (proposal.already_seen_feedback === 'liked' && proposal.title?.directors) {
        for (const dir of proposal.title.directors) directors.add(dir)
      }
    }
    return Array.from(directors)
  }

  // Strength of the popularity bias. Raised when the user has told us mid-session that they
  // do not know the movies being proposed, then ramped further on each subsequent skip.
  private popularityAlpha(searchSession: unknown): number {
    const ss = searchSession as {
      exit_feedback: string | null
      proposals: Array<{ accepted: boolean | null; already_seen: boolean | null }>
    }

    if (ss.exit_feedback !== 'dont_know_movies') return BASE_ALPHA

    const skips = ss.proposals.filter(p => p.accepted === false && p.already_seen !== true).length
    const extraSkips = Math.max(0, skips - SKIP_PROMPT_THRESHOLD)

    return Math.min(BOOSTED_ALPHA + 0.05 * extraSkips, MAX_ALPHA)
  }

  private maximalStartYear(searchSession: unknown): number | null {
    const ss = searchSession as { proposals: Array<{ rejected_feedback: string | null; title?: { start_year: number | null } }> }
    const tooOldYears = ss.proposals
      .filter(p => p.rejected_feedback === 'too_old' && p.title?.start_year)
      .map(p => p.title!.start_year!)
    return tooOldYears.length <= 0 ? null : Math.max.apply(null, tooOldYears)
  }

  private maximalRuntime(searchSession: unknown): number | null {
    const ss = searchSession as { proposals: Array<{ rejected_feedback: string | null; title?: { runtime_minutes: number | null } }> }
    const tooLongRuntimes = ss.proposals
      .filter(p => p.rejected_feedback === 'too_long' && p.title?.runtime_minutes)
      .map(p => p.title!.runtime_minutes!)
    return tooLongRuntimes.length <= 0 ? null : Math.max.apply(null, tooLongRuntimes)
  }

  private feedbackExcludedGenres(searchSession: unknown): string[] {
    const ss = searchSession as { proposals: Array<{ rejected_feedback: string | null }> }
    const genres = new Set<string>()
    for (const proposal of ss.proposals) {
      const exclusions = FEEDBACK_GENRE_EXCLUSIONS[proposal.rejected_feedback || '']
      if (exclusions) {
        for (const genre of exclusions) genres.add(genre)
      }
    }
    return Array.from(genres)
  }

  private titleFilters(searchSession: InstanceType<typeof SearchSession>): Record<string, unknown> {
    const maximalStartYear = this.maximalStartYear(searchSession)
    const maximalRuntime = this.maximalRuntime(searchSession)
    const where: Record<string, unknown> = {}

    const alreadyProposedTconsts = (searchSession as unknown as { proposals: Array<{ tconst: string }> }).proposals?.map(p => p.tconst) || []
    if (alreadyProposedTconsts.length > 0) {
      where.tconst = { [Op.notIn]: alreadyProposedTconsts }
    }

    if (maximalStartYear) {
      where.start_year = { [Op.gt]: maximalStartYear }
    }

    if (maximalRuntime) {
      where.runtime_minutes = { [Op.lt]: maximalRuntime }
    }

    if (searchSession.genres) {
      where.genres = { [Op.overlap]: searchSession.genres }
    }

    // Collect genre exclusions from both scenario config and rejection feedback
    const scenarioExclusions: string[] = []
    const scenario = searchSession.public
    if (scenario && scenarioConfig[scenario]) {
      const config = scenarioConfig[scenario]

      where.is_adult = false
      scenarioExclusions.push(...config.excludeGenres)

      if (config.maxRuntimeMinutes !== null) {
        const scenarioMax = config.maxRuntimeMinutes
        const effectiveMax = maximalRuntime
          ? Math.min(maximalRuntime, scenarioMax)
          : scenarioMax
        where.runtime_minutes = { [Op.lte]: effectiveMax }
      }
    }

    const feedbackExclusions = this.feedbackExcludedGenres(searchSession)
    const allExclusions = [...new Set([...scenarioExclusions, ...feedbackExclusions])]

    // User-selected genres override exclusions
    const effectiveExclusions = allExclusions.filter(
      g => !searchSession.genres?.includes(g)
    )

    if (effectiveExclusions.length > 0) {
      const escapedGenres = effectiveExclusions.map(g => db.sequelize.escape(g)).join(',')
      const excludeCondition = literal(`NOT ("title"."genres" && ARRAY[${escapedGenres}]::varchar[])`)

      if (searchSession.genres) {
        where[Op.and as unknown as string] = [
          { genres: { [Op.overlap]: searchSession.genres } },
          excludeCondition
        ]
        delete where.genres
      } else {
        where[Op.and as unknown as string] = [excludeCondition]
      }
    }

    return where
  }

  private async fetchSearchSession(): Promise<InstanceType<typeof SearchSession> | null> {
    return await SearchSession.findByPk(this.searchSessionUUID, { include: [{ model: Proposal, include: [Title] }] })
  }
}

export default ProposalCreatorService
