require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
require('dotenv').config()

module.exports = {
  HOST: process.env.POSTGRES_HOST,
  USER: process.env.POSTGRES_USER,
  PASSWORD: process.env.POSTGRES_PASSWORD,
  DATABASE: process.env.POSTGRES_DATABASE,
  DIALECT: 'postgres',
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
