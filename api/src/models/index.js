const dbConfig = require('../../config/db.config.js')

const Sequelize = require('sequelize')
const SequelizeOptions = {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  dialectModule: require('pg'),
  logging: process.env.NODE_ENV === 'development',
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle
  }
}
if (process.env.NODE_ENV === 'production') {
  SequelizeOptions.dialectOptions = {
    ssl: {
      require: process.env.NODE_ENV === 'production',
      rejectUnauthorized: false
    }
  }
}
const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, SequelizeOptions)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.titles = require('./title.model.js')(sequelize, Sequelize)
db.search_sessions = require('./search_session.model.js')(sequelize, Sequelize)
db.proposals = require('./proposal.model.js')(sequelize, Sequelize)
db.videos = require('./video.model.js')(sequelize, Sequelize)

db.proposals.belongsTo(db.search_sessions, {
  foreignKey: 'search_session_uuid'
})

db.proposals.belongsTo(db.titles, {
  foreignKey: 'tconst'
})

db.videos.belongsTo(db.titles, {
  foreignKey: 'tconst'
})

db.titles.hasOne(db.videos, {
  foreignKey: 'tconst'
})

db.search_sessions.hasMany(db.proposals, {
  foreignKey: 'search_session_uuid'
})

module.exports = db
