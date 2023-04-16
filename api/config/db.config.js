require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
require('dotenv').config()

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DATABASE: process.env.DB_NAME,
  DIALECT: 'postgres',
  POOL: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
