import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenv.config()

interface DbConfig {
  HOST: string | undefined
  USER: string | undefined
  PASSWORD: string | undefined
  DATABASE: string | undefined
  DIALECT: 'postgres'
  POOL: {
    max: number
    min: number
    acquire: number
    idle: number
  }
}

const dbConfig: DbConfig = {
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

export default dbConfig
