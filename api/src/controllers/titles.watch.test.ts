import request from 'supertest'
import crypto from 'crypto'
import app from '../../app'
import db from '../models'

const Title = db.titles

const tmdbResponse = {
  id: 335984,
  poster_path: '/poster.jpg',
  'watch/providers': {
    results: {
      FR: {
        link: 'https://www.themoviedb.org/movie/335984/watch?locale=FR',
        flatrate: [
          { logo_path: '/netflix.jpg', provider_id: 8, provider_name: 'Netflix', display_priority: 2 }
        ]
      }
    }
  }
}

describe('#watchProviders', () => {
  describe('when the title is unknown', () => {
    test('returns a 404 status code', () => {
      return request(app)
        .get('/titles/tt00000000/watch')
        .expect(404)
    })
  })

  describe('when the title exists', () => {
    let tconst: string

    beforeEach(async () => {
      const title = await Title.create({ tconst: `tt${crypto.randomBytes(4).toString('hex')}` })
      tconst = title.tconst
      global.fetch = jest.fn(() =>
        Promise.resolve({ json: () => Promise.resolve(tmdbResponse) })
      ) as unknown as typeof fetch;
      (global.fetch as jest.Mock).mockClear()
    })

    test('returns providers for the requested region', async () => {
      return request(app)
        .get(`/titles/${tconst}/watch?region=fr`)
        .expect(200)
        .then(response => {
          expect(response.body.region).toBe('FR')
          expect(response.body.flatrate[0].provider_name).toBe('Netflix')
          expect(response.body.flatrate[0].logo_url).toContain('image.tmdb.org')
        })
    })

    test('falls back to US when no region is provided', async () => {
      return request(app)
        .get(`/titles/${tconst}/watch`)
        .expect(200)
        .then(response => {
          expect(response.body.region).toBe('US')
          expect(response.body.flatrate).toEqual([])
        })
    })
  })

  describe('when The Movie DB request fails', () => {
    let tconst: string

    beforeEach(async () => {
      const title = await Title.create({ tconst: `tt${crypto.randomBytes(4).toString('hex')}` })
      tconst = title.tconst
      global.fetch = jest.fn(() => Promise.reject(new Error('network down'))) as unknown as typeof fetch;
      (global.fetch as jest.Mock).mockClear()
    })

    test('returns a 502 status code', async () => {
      return request(app)
        .get(`/titles/${tconst}/watch?region=fr`)
        .expect(502)
    })
  })
})
