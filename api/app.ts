import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })
dotenv.config()

import indexRouter from './src/routes/index'
import proposalsRouter from './src/routes/proposals'
import searchSessionsRouter from './src/routes/search_sessions'
import titlesRouter from './src/routes/titles'

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'))
}
const corsOrigin = process.env.CORS_ORIGIN
app.use(cors(corsOrigin ? { origin: corsOrigin } : undefined))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use((req, _res, next) => {
  req.body ??= {}
  next()
})

app.use('/', indexRouter)
app.use('/proposals', proposalsRouter)
app.use('/search_sessions', searchSessionsRouter)
app.use('/titles', titlesRouter)

// catch 404 and forward to error handler
app.use(function (_req: Request, _res: Response, next: NextFunction) {
  next(createError(404))
})

// error handler
app.use(function (err: { message: string; status?: number; stack?: string }, _req: Request, res: Response, _next: NextFunction) {
  res.locals.message = err.message
  res.locals.error = _req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.json({
    message: err.message,
    status: err.status,
    stack: err.stack
  })
})

export default app
