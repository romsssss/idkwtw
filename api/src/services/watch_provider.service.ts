const TMDB_LOGO_BASE = 'https://image.tmdb.org/t/p/w92'
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500'

interface TmdbProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
}

interface TmdbRegionResult {
  link: string
  flatrate?: TmdbProvider[]
  rent?: TmdbProvider[]
  buy?: TmdbProvider[]
}

// Movie details with watch providers appended in a single request.
interface TmdbMovieResponse {
  id?: number
  poster_path?: string | null
  overview?: string | null
  'watch/providers'?: {
    results: Record<string, TmdbRegionResult | undefined>
  }
}

export interface NormalizedProvider {
  provider_id: number
  provider_name: string
  logo_url: string
}

export interface WatchProviders {
  region: string
  poster_url: string | null
  overview: string | null
  link: string | null
  flatrate: NormalizedProvider[]
  rent: NormalizedProvider[]
  buy: NormalizedProvider[]
}

interface ServiceSuccess {
  success: true
  body: WatchProviders
}

interface ServiceFailure {
  success: false
  error: Error
}

type ServiceResult = ServiceSuccess | ServiceFailure

class WatchProviderService {
  private tconst: string
  private region: string

  constructor(tconst: string, region: string) {
    this.tconst = tconst
    this.region = region.toUpperCase()
  }

  async perform(): Promise<ServiceResult> {
    try {
      const movie = await this.lookupMovieOnTheMovieDB()

      // A missing id means TMDB rejected the request (bad key, unknown movie,
      // rate limit). Surface it as a failure rather than an empty result so the
      // page can distinguish "lookup failed" from "no providers here".
      if (!movie.id) {
        throw new Error('The Movie DB lookup failed')
      }

      const regionResult = movie['watch/providers']?.results?.[this.region]

      return {
        success: true,
        body: {
          region: this.region,
          poster_url: movie.poster_path ? `${TMDB_POSTER_BASE}${movie.poster_path}` : null,
          overview: movie.overview || null,
          link: regionResult?.link ?? null,
          flatrate: this.normalize(regionResult?.flatrate),
          rent: this.normalize(regionResult?.rent),
          buy: this.normalize(regionResult?.buy)
        }
      }
    } catch (err) {
      return { success: false, error: err as Error }
    }
  }

  private normalize(providers: TmdbProvider[] | undefined): NormalizedProvider[] {
    if (!providers) { return [] }

    return [...providers]
      .sort((x, y) => x.display_priority - y.display_priority)
      .map(provider => ({
        provider_id: provider.provider_id,
        provider_name: provider.provider_name,
        logo_url: `${TMDB_LOGO_BASE}${provider.logo_path}`
      }))
  }

  private async lookupMovieOnTheMovieDB(): Promise<TmdbMovieResponse> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${this.tconst}?api_key=${process.env.API_KEY_THE_MOVIE_DB}&append_to_response=watch/providers`, requestOptions)

    return await response.json() as TmdbMovieResponse
  }
}

export default WatchProviderService
