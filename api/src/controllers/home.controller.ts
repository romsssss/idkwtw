import { Request, Response } from 'express'
import db from '../models'

export const ping = (_req: Request, res: Response): void => {
  res.json({ ping: 'pong' })
}

export const sync = (_req: Request, res: Response): void => {
  db.sequelize.sync({ force: true })
    .then(function () {
      res.status(200).send({ message: 'sync done' })
    })
    .catch(function (error: Error) {
      res.status(500).send({ message: 'Error while syncing DB:' + error.message })
    })
}
