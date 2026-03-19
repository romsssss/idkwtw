import db from './src/models'

beforeEach(async () => {
  await db.videos.destroy({ truncate: true, cascade: true })
  await db.proposals.destroy({ truncate: true, cascade: true })
  await db.search_sessions.destroy({ truncate: true, cascade: true })
  await db.titles.destroy({ truncate: true, cascade: true })
})

afterAll(() => db.sequelize.close())
