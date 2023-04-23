const VideoCreatorService = require('../../src/services/video_creator.service')
const crypto = require('crypto')
const db = require('../../src/models')
const Title = db.titles
const Video = db.videos

describe('#perform', () => {
  describe('when title does not exist', () => {
    const unknownTconst = 'tt00000000'

    test('returns success false', async () => {
      const VideoCreatorServiceInstance = new VideoCreatorService(unknownTconst)
      const res = await VideoCreatorServiceInstance.perform()

      expect(res.success).toBe(false)
    })

    test('returns an error message', async () => {
      const VideoCreatorServiceInstance = new VideoCreatorService(unknownTconst)
      const res = await VideoCreatorServiceInstance.perform()

      expect(res.error.message).toEqual('Title not found')
    })
  })

  describe('when title exists', () => {
    let title

    beforeEach(async () => {
      title = await Title.create({ tconst: `tt${crypto.randomBytes(4).toString('hex')}` })
    })

    describe('when title already has a video', () => {
      beforeEach(async () => {
        title = await Video.create({ tconst: title.tconst, type: 'trailer', site: 'youtube', key: '000000' })
      })

      test('returns success false', async () => {
        const VideoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const res = await VideoCreatorServiceInstance.perform()

        expect(res.success).toBe(false)
      })

      test('returns an error message', async () => {
        const VideoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const res = await VideoCreatorServiceInstance.perform()

        expect(res.error.message).toEqual(expect.stringContaining('already has a video of type trailer'))
      })
    })

    describe('when trailer is not found on The Movie DB', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({ results: [] })
          })
        )
        fetch.mockClear()
      })

      test('returns success false', async () => {
        const VideoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const res = await VideoCreatorServiceInstance.perform()

        expect(res.success).toBe(false)
      })

      test('returns an error', async () => {
        const VideoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const res = await VideoCreatorServiceInstance.perform()

        expect(res.error.message).toEqual(expect.stringContaining('No video found on The Movie DB'))
      })
    })

    describe('when trailer is found on The Movie DB', () => {
      beforeEach(() => {
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({
              results: [{
                iso_639_1: 'en',
                iso_3166_1: 'US',
                name: 'Fight Club - Theatrical Trailer Remastered in HD',
                key: '6JnN1DmbqoU',
                site: 'YouTube',
                size: 1080,
                type: 'Trailer',
                official: false,
                published_at: '2015-02-26T03:19:25.000Z',
                id: '5e382d1b4ca676001453826d'
              }, {
                iso_639_1: 'en',
                iso_3166_1: 'US',
                name: 'Fight Club | #TBT Trailer | 20th Century FOX',
                key: 'BdJKm16Co6M',
                site: 'YouTube',
                size: 1080,
                type: 'Trailer',
                official: true,
                published_at: '2016-11-04T19:20:22.000Z',
                id: '5c9294240e0a267cd516835'
              }, {
                iso_639_1: 'en',
                iso_3166_1: 'US',
                name: 'Fight Club | another trailer',
                key: 'kJdKm16Ci8H',
                site: 'YouTube',
                size: 1080,
                type: 'Trailer',
                official: true,
                published_at: '2014-10-02T19:20:22.000Z',
                id: '5c926238f07d67cd516835'
              }]
            })
          })
        )
        fetch.mockClear()
      })

      test('returns success true', async () => {
        const VideoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const res = await VideoCreatorServiceInstance.perform()

        expect(res.success).toBe(true)
      })

      test('returns a new video', async () => {
        const VideoCreatorServiceInstance = new VideoCreatorService(title.tconst)
        const res = await VideoCreatorServiceInstance.perform()

        expect(res.body).toBeInstanceOf(Video)
        expect(res.body.tconst).not.toBeNull()
        expect(res.body.key).toEqual('BdJKm16Co6M')
      })
    })
  })
})
