const request = require('supertest')
const app = require('../../app')

describe('#ping ', () => {
  test('returns a 200 status code', () => {
    return request(app)
      .get('/')
      .expect(200)
  })

  test('returns JSON', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.headers['content-type']).toEqual('application/json; charset=utf-8')
      })
  })

  test('returns pong message', () => {
    return request(app)
      .get('/')
      .then(response => {
        expect(response.body).toMatchObject({ ping: 'pong' })
      })
  })
})
