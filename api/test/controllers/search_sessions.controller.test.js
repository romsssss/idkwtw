const request = require('supertest')
const app = require('../../app')
const db = require('../../src/models')
const SearchSession = db.search_sessions

describe('#create', () => {
  describe('when creation is successful', () => {
    test('returns a 201 status code', () => {
      return request(app)
        .post('/search_sessions')
        .send({})
        .expect(201)
    })

    test('returns new search session', () => {
      return request(app)
        .post('/search_sessions')
        .send({})
        .then(response => {
          expect(response.body).toHaveProperty('uuid')
        })
    })
  })

  describe('when creation fails', () => {
    const invalidPublic = 'invalid-public-value'

    test('returns a 500 status code', () => {
      return request(app)
        .post('/search_sessions')
        .send({ public: invalidPublic })
        .expect(422)
    })

    test('returns an error message', () => {
      return request(app)
        .post('/search_sessions')
        .send({ public: invalidPublic })
        .then(response => {
          expect(response.body).toHaveProperty('message')
        })
    })
  })
})

describe('#findOne', () => {
  describe('when an invalid uuid is given ', () => {
    const uuid = 'invalid-uuid-format'

    test('returns a 400 status code', () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).toEqual('Invalid UUID syntax')
        })
    })
  })

  describe('when an unknown uuid is given ', () => {
    const uuid = '00000000-0000-0000-0000-000000000000'

    test('returns a 404 status code', () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).toEqual(expect.stringContaining('Cannot find'))
        })
    })
  })

  describe('when a correct uuid is given ', () => {
    test('returns a 200 status code', async () => {
      const searchSession = await SearchSession.create()
      const uuid = searchSession.uuid

      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .expect(200)
    })

    test('returns search session details', async () => {
      const searchSession = await SearchSession.create()
      const uuid = searchSession.uuid

      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body).toHaveProperty('createdAt')
        })
    })
  })
})

describe('#update ', () => {
  describe('when an invalid uuid is given ', () => {
    const uuid = 'invalid-uuid-format'

    test('returns a 400 status code', () => {
      return request(app)
        .put(`/search_sessions/${uuid}`)
        .send({})
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .put(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).toEqual('Invalid UUID syntax')
        })
    })
  })

  describe('when an unknown uuid is given ', () => {
    const uuid = '00000000-0000-0000-0000-000000000000'

    test('returns a 404 status code', () => {
      return request(app)
        .put(`/search_sessions/${uuid}`)
        .send({})
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .put(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).not.toBeNull()
        })
    })
  })

  describe('when a correct uuid is given ', () => {
    describe('with valid parameters', () => {
      test('returns a 200 status code', async () => {
        const searchSession = await SearchSession.create({ public: 'kids' })
        const uuid = searchSession.uuid

        return request(app)
          .put(`/search_sessions/${uuid}`)
          .send({ public: 'friends' })
          .expect(200)
      })

      test('updates search session details', async () => {
        const searchSession = await SearchSession.create({ public: 'kids' })
        const uuid = searchSession.uuid

        expect(searchSession.public).toEqual('kids')

        return request(app)
          .put(`/search_sessions/${uuid}`)
          .send({ public: 'friends' })
          .then(response => {
            expect(response.body.public).toEqual('friends')
          })
      })
    })

    describe('with invalid parameters', () => {
      test('returns a 422 status code', async () => {
        const searchSession = await SearchSession.create({ public: 'kids' })
        const uuid = searchSession.uuid

        return request(app)
          .put(`/search_sessions/${uuid}`)
          .send({ public: 'not-a-valid-public' })
          .expect(422)
      })

      test('returns an error message', async () => {
        const searchSession = await SearchSession.create({ public: 'kids' })
        const uuid = searchSession.uuid

        expect(searchSession.public).toEqual('kids')

        return request(app)
          .put(`/search_sessions/${uuid}`)
          .send({ public: 'not-a-valid-public' })
          .then(response => {
            expect(response.body.message).not.toBeNull()
          })
      })
    })
  })
})
