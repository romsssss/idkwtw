import db from '../models'

const Title = db.titles
const Video = db.videos

interface TmdbVideoResult {
  name: string
  type: string
  site: string
  key: string
  size: number
  official: boolean
  iso_639_1: string
  iso_3166_1: string
  published_at: string
}

interface ServiceSuccess {
  success: true
  body: InstanceType<typeof Video>
}

interface ServiceFailure {
  success: false
  error: Error
}

type ServiceResult = ServiceSuccess | ServiceFailure

class VideoCreatorService {
  private tconst: string
  private videoType: string

  constructor(tconst: string) {
    this.tconst = tconst
    this.videoType = 'trailer'
  }

  async perform(): Promise<ServiceResult> {
    try {
      const title = await Title.findByPk(this.tconst)
      if (!title) { throw new Error('Title not found') }

      const video = await Video.findOne({
        where: {
          tconst: title.tconst,
          type: this.videoType
        }
      })
      if (video) { throw new Error(`Title ${title.tconst} already has a video of type ${this.videoType}`) }

      const result = await this.lookupTrailerOnTheMovieDB()
      if (result === undefined) { throw new Error(`No video found on The Movie DB for title ${title.tconst}`) }

      const videoParams = {
        tconst: title.tconst,
        name: result.name,
        type: result.type.toLowerCase() as 'trailer',
        site: result.site.toLowerCase() as 'youtube',
        key: result.key,
        size: result.size,
        official: result.official,
        iso_639_1: result.iso_639_1,
        iso_3166_1: result.iso_3166_1,
        published_at: new Date(result.published_at)
      }
      const newVideo = await Video.create(videoParams)

      return { success: true, body: newVideo }
    } catch (err) {
      return { success: false, error: err as Error }
    }
  }

  private async lookupTrailerOnTheMovieDB(): Promise<TmdbVideoResult | undefined> {
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${this.tconst}/videos?api_key=${process.env.API_KEY_THE_MOVIE_DB}&language=en-US`, requestOptions)
    const responseJson = await response.json() as { results: TmdbVideoResult[] }
    let results = responseJson.results

    results = results.sort((x, y) => {
      if (x.official === y.official) {
        return new Date(x.published_at) < new Date(y.published_at) ? 1 : -1
      } else {
        return x.official ? -1 : 1
      }
    })

    return results[0]
  }
}

export default VideoCreatorService
