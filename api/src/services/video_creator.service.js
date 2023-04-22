const db = require('../models')
const Title = db.titles
const Video = db.videos

class VideoCreatorService {
  constructor (tconst) {
    this.tconst = tconst
    this.videoType = 'trailer'
  }

  async perform () {
    try {
      // Retrieve title
      const title = await Title.findByPk(this.tconst)
      if (!title) { throw new Error('Title not found') }

      // Check if the title does not already have a video
      const video = await Video.findOne({
        where: {
          tconst: title.tconst,
          type: this.videoType
        }
      })
      if (video) { throw new Error(`Title ${title.tconst} already has a video of type ${this.videoType}`) }

      // Get trailer video from The Movie DB
      const result = await this._lookupTrailerOnTheMovieDB()
      if (result === undefined) { throw new Error(`No video found on The Movie DB for title ${title.tconst}`) }

      const videoParams = {
        tconst: title.tconst,
        name: result.name,
        type: result.type.toLowerCase(),
        site: result.site.toLowerCase(),
        key: result.key,
        size: result.size,
        official: result.official,
        iso_639_1: result.iso_639_1,
        iso_3166_1: result.iso_3166_1,
        published_at: result.published_at
      }
      const newVideo = await Video.create(videoParams)

      return { success: true, body: newVideo }
    } catch (err) {
      return { success: false, error: err }
    }
  }

  async _lookupTrailerOnTheMovieDB () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    const response = await fetch(`https://api.themoviedb.org/3/movie/${this.tconst}/videos?api_key=${process.env.API_KEY_THE_MOVIE_DB}&language=en-US`, requestOptions)
    const responseJson = await response.json()
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

module.exports = VideoCreatorService
