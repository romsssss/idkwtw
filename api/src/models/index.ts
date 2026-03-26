import { Sequelize } from 'sequelize'
import pg from 'pg'
import dbConfig from '../../config/db.config'
import Title from './title.model'
import SearchSession from './search_session.model'
import Proposal from './proposal.model'
import Video from './video.model'

const sequelizeOptions: Record<string, unknown> = {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  dialectModule: pg,
  logging: process.env.NODE_ENV === 'development',
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle
  },
  define: {
    schema: 'public'
  }
}

if (process.env.NODE_ENV === 'production') {
  sequelizeOptions.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(
  dbConfig.DATABASE as string,
  dbConfig.USER as string,
  dbConfig.PASSWORD,
  sequelizeOptions as never
)

// Initialize models
Title.initModel(sequelize)
SearchSession.initModel(sequelize)
Proposal.initModel(sequelize)
Video.initModel(sequelize)

// Set up associations
Proposal.belongsTo(SearchSession, { foreignKey: 'search_session_uuid' })
Proposal.belongsTo(Title, { foreignKey: 'tconst' })
Video.belongsTo(Title, { foreignKey: 'tconst' })
Title.hasOne(Video, { foreignKey: 'tconst' })
SearchSession.hasMany(Proposal, { foreignKey: 'search_session_uuid' })

const db = {
  sequelize,
  Sequelize,
  titles: Title,
  search_sessions: SearchSession,
  proposals: Proposal,
  videos: Video
}

export default db
