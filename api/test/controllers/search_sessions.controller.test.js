const request = require("supertest");
const app = require("../../app");
const db = require("../../models");
const SearchSession = db.search_sessions;

describe("#create ", () => {
  describe("when creation is successful", () => {
    test("returns a 201 status code", () => {
      return request(app)
        .post("/search_sessions")
        .send({})
        .then(response => {
          expect(response.statusCode).toBe(201);
        });
    });

    test("returns new search session", () => {
      return request(app)
        .post("/search_sessions")
        .send({})
        .then(response => {
          expect(response.body).toHaveProperty('uuid');
        });
    });
  });

  describe("when creation fails", () => {
    const invalidPublic = 'invalid-public-value';

    test("returns a 201 status code", () => {
      return request(app)
        .post("/search_sessions")
        .send({ public: invalidPublic})
        .then(response => {
          expect(response.statusCode).toBe(500);
        });
    });

    test("returns an error message", () => {
      return request(app)
        .post("/search_sessions")
        .send({ public: invalidPublic})
        .then(response => {
          expect(response.body).toHaveProperty('message');
        });
    });
  });
});


describe("#findOne ", () => {
  describe("when an invalid uuid is given ", () => {
    const uuid = 'invalid-uuid-format';

    test("returns a 400 status code", () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.statusCode).toBe(400);
        });
    });

    test("returns an error message", () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).toEqual('Invalid UUID syntax')
        });
    });
  });

  describe("when an unknown uuid is given ", () => {
    const uuid = '00000000-0000-0000-0000-000000000000';

    test("returns a 404 status code", () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.statusCode).toBe(404);
        });
    });

    test("returns an error message", () => {
      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body.message).toEqual(expect.stringContaining('Cannot find'))
        });
    });
  });

  describe("when a correct uuid is given ", () => {
    test("returns a 200 status code", async () => {
      let searchSession = await SearchSession.create();
      const uuid = searchSession.uuid;

      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    test("returns search session details", async () => {
      let searchSession = await SearchSession.create();
      const uuid = searchSession.uuid;

      return request(app)
        .get(`/search_sessions/${uuid}`)
        .send({})
        .then(response => {
          expect(response.body).toHaveProperty('createdAt');
        });
    });
  });
});
