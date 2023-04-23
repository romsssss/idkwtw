const request = require('supertest')
const crypto = require('crypto')
const app = require('../../app')
const db = require('../../src/models')
const Title = db.titles

describe('#findOne', () => {
  describe('when an unknown tconst is given ', () => {
    const tconst = 'tt00000000'

    test('returns a 404 status code', () => {
      return request(app)
        .get(`/titles/${tconst}`)
        .send({})
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .get(`/titles/${tconst}`)
        .send({})
        .then(response => {
          expect(response.body.message).toEqual(expect.stringContaining('Cannot find'))
        })
    })
  })

  describe('when a valid tconst is given ', () => {
    let tconst

    beforeEach(async () => {
      const title = await Title.create({ tconst: `tt${crypto.randomBytes(4).toString('hex')}` })
      tconst = title.tconst
    })

    test('returns a 200 status code', async () => {
      return request(app)
        .get(`/titles/${tconst}`)
        .send({})
        .expect(200)
    })

    test('returns title details', async () => {
      return request(app)
        .get(`/titles/${tconst}`)
        .send({})
        .then(response => {
          expect(response.body).toHaveProperty('primary_title')
        })
    })
  })
})
