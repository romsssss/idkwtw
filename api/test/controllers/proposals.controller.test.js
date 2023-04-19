const request = require('supertest')
const app = require('../../app')
const db = require('../../src/models')
const SearchSession = db.search_sessions
const Proposal = db.proposals

describe('#create', () => {
  describe('when search_session_uuid param is missing', () => {
    test('returns a 400 status code', () => {
      return request(app)
        .post('/proposals')
        .send({})
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .post('/proposals')
        .send({})
        .then(response => {
          expect(response.body.message).toEqual('Missing search_session_uuid param')
        })
    })
  })

  describe('when search_session_uuid param is invalid', () => {
    const uuid = 'invalid-uuid-format'

    test('returns a 400 status code', () => {
      return request(app)
        .post('/proposals')
        .query({ search_session_uuid: uuid })
        .send({})
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .post('/proposals')
        .query({ search_session_uuid: uuid })
        .send({})
        .then(response => {
          expect(response.body.message).toEqual('Invalid Search Session UUID syntax')
        })
    })
  })

  describe('when an unknown search_session_uuid param is given', () => {
    const uuid = '00000000-0000-0000-0000-000000000000'

    test('returns a 404 status code', () => {
      return request(app)
        .post('/proposals')
        .query({ search_session_uuid: uuid })
        .send({})
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .post('/proposals')
        .query({ search_session_uuid: uuid })
        .send({})
        .then(response => {
          expect(response.body.message).toEqual(expect.stringContaining('Unknown'))
        })
    })
  })

  describe('when creation is successful', () => {
    test('returns a 201 status code', async () => {
      const searchSession = await SearchSession.create()
      return request(app)
        .post('/proposals')
        .query({ search_session_uuid: searchSession.uuid })
        .send({})
        .expect(201)
    })

    test('returns new search session', async () => {
      const searchSession = await SearchSession.create()

      return request(app)
        .post('/proposals')
        .query({ search_session_uuid: searchSession.uuid })
        .send({})
        .then(response => {
          expect(response.body).toHaveProperty('tconst')
        })
    })
  })
})

describe('#findOne', () => {
  describe('when an invalid uuid is given ', () => {
    const uuid = 'invalid-uuid-format'

    test('returns a 400 status code', () => {
      return request(app)
        .get(`/proposals/${uuid}`)
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .get(`/proposals/${uuid}`)
        .then(response => {
          expect(response.body.message).toEqual('Invalid UUID syntax')
        })
    })
  })

  describe('when an unknown uuid is given ', () => {
    const uuid = '00000000-0000-0000-0000-000000000000'

    test('returns a 404 status code', () => {
      return request(app)
        .get(`/proposals/${uuid}`)
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .get(`/proposals/${uuid}`)
        .then(response => {
          expect(response.body.message).toEqual(expect.stringContaining('Cannot find'))
        })
    })
  })

  describe('when a correct uuid is given ', () => {
    test('returns a 200 status code', async () => {
      const searchSession = await SearchSession.create()
      const proposal = await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
      const uuid = proposal.uuid

      return request(app)
        .get(`/proposals/${uuid}`)
        .expect(200)
    })

    test('returns search session details', async () => {
      const searchSession = await SearchSession.create()
      const proposal = await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
      const uuid = proposal.uuid

      return request(app)
        .get(`/proposals/${uuid}`)
        .then(response => {
          expect(response.body).toHaveProperty('createdAt')
        })
    })
  })
})

describe('#findAll', () => {
  describe('when no search_session_uuid is given ', () => {
    test('returns a 400 status code', () => {
      return request(app)
        .get('/proposals')
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .get('/proposals')
        .then(response => {
          expect(response.body.message).toEqual('Missing search_session_uuid param')
        })
    })
  })

  describe('when an invalid search_session_uuid is given ', () => {
    const uuid = 'invalid-uuid-format'

    test('returns a 400 status code', () => {
      return request(app)
        .get('/proposals')
        .query({ search_session_uuid: uuid })
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .get('/proposals')
        .query({ search_session_uuid: uuid })
        .then(response => {
          expect(response.body.message).toEqual('Invalid Search Session UUID syntax')
        })
    })
  })

  describe('when an unknown uuid is given ', () => {
    const uuid = '00000000-0000-0000-0000-000000000000'

    test('returns a 404 status code', () => {
      return request(app)
        .get('/proposals')
        .query({ search_session_uuid: uuid })
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .get('/proposals')
        .query({ search_session_uuid: uuid })
        .then(response => {
          expect(response.body.message).toEqual(expect.stringContaining('Unknown'))
        })
    })
  })

  describe('when a correct search session uuid is given ', () => {
    test('returns a 200 status code', async () => {
      const searchSession = await SearchSession.create()
      await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })

      return request(app)
        .get('/proposals')
        .query({ search_session_uuid: searchSession.uuid })
        .expect(200)
    })

    test('returns a the list of proposals', async () => {
      const searchSession = await SearchSession.create()
      await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
      await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000001' })

      return request(app)
        .get('/proposals')
        .query({ search_session_uuid: searchSession.uuid })
        .then(response => {
          expect(response.body).toHaveLength(2)
          expect(response.body[0].tconst).toEqual('tt00000000')
        })
    })
  })
})

describe('#update ', () => {
  describe('when an invalid uuid is given ', () => {
    const uuid = 'invalid-uuid-format'

    test('returns a 400 status code', () => {
      return request(app)
        .put(`/proposals/${uuid}`)
        .send({})
        .expect(400)
    })

    test('returns an error message', () => {
      return request(app)
        .put(`/proposals/${uuid}`)
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
        .put(`/proposals/${uuid}`)
        .send({})
        .expect(404)
    })

    test('returns an error message', () => {
      return request(app)
        .put(`/proposals/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).not.toBeNull()
        })
    })
  })

  describe('when a correct uuid is given ', () => {
    describe('with valid parameters', () => {
      test('returns a 200 status code', async () => {
        const searchSession = await SearchSession.create()
        const proposal = await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
        const uuid = proposal.uuid

        return request(app)
          .put(`/proposals/${uuid}`)
          .send({ rejected_feedback: 'too_long' })
          .expect(200)
      })

      test('updates proposal details', async () => {
        const searchSession = await SearchSession.create()
        const proposal = await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
        const uuid = proposal.uuid

        expect(proposal.rejected_feedback).toBeNull()

        return request(app)
          .put(`/proposals/${uuid}`)
          .send({ rejected_feedback: 'too_long' })
          .then(response => {
            expect(response.body.rejected_feedback).toEqual('too_long')
          })
      })
    })

    describe('with invalid parameters', () => {
      test('returns a 422 status code', async () => {
        const searchSession = await SearchSession.create()
        const proposal = await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
        const uuid = proposal.uuid

        return request(app)
          .put(`/proposals/${uuid}`)
          .send({ rejected_feedback: 'invalid-value' })
          .expect(422)
      })

      test('returns an error message', async () => {
        const searchSession = await SearchSession.create()
        const proposal = await Proposal.create({ search_session_uuid: searchSession.uuid, tconst: 'tt00000000' })
        const uuid = proposal.uuid

        return request(app)
          .put(`/proposals/${uuid}`)
          .send({ rejected_feedback: 'invalid-value' })
          .then(response => {
            expect(response.body.message).not.toBeNull()
          })
      })
    })
  })
})
