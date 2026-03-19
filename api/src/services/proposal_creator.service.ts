import VideoCreatorService from './video_creator.service'
import db from '../models'
import { Op } from 'sequelize'

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

      if (!videoCreatorServiceRes?.success) { throw videoCreatorServiceRes?.error || new Error('No video found') }

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
      return await Title.findOne({ where, order: db.sequelize.random(), include: [Video] })
    }
  }

  private minimalStartYear(searchSession: unknown): number | null {
    const ss = searchSession as { proposals: Array<{ rejected_feedback: string | null; title?: { start_year: number | null } }> }
    const tooOldYears = ss.proposals
      .filter(p => p.rejected_feedback === 'too_old' && p.title?.start_year)
      .map(p => p.title!.start_year!)
    return tooOldYears.length <= 0 ? null : Math.min.apply(null, tooOldYears)
  }

  private maximalRuntime(searchSession: unknown): number | null {
    const ss = searchSession as { proposals: Array<{ rejected_feedback: string | null; title?: { runtime_minutes: number | null } }> }
    const tooLongRuntimes = ss.proposals
      .filter(p => p.rejected_feedback === 'too_long' && p.title?.runtime_minutes)
      .map(p => p.title!.runtime_minutes!)
    return tooLongRuntimes.length <= 0 ? null : Math.max.apply(null, tooLongRuntimes)
  }

  private titleFilters(searchSession: InstanceType<typeof SearchSession>): Record<string, unknown> {
    const minimalStartYear = this.minimalStartYear(searchSession)
    const maximalRuntime = this.maximalRuntime(searchSession)
    const where: Record<string, unknown> = {}

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

  private async fetchSearchSession(): Promise<InstanceType<typeof SearchSession> | null> {
    return await SearchSession.findByPk(this.searchSessionUUID, { include: [{ model: Proposal, include: [Title] }] })
  }
}

export default ProposalCreatorService
