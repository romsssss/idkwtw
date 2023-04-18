const db = require('../src/models')
afterAll(() => db.sequelize.close())
