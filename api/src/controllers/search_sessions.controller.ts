import { Request, Response } from 'express'
import { isValidUUID } from '../utils/helper.util'
import db from '../models'

const SearchSession = db.search_sessions
const Proposal = db.proposals

export const create = (req: Request, res: Response): void => {
  const searchSessionParams = {
    public: req.body.public,
    genres: req.body.genres
  }

  SearchSession.create(searchSessionParams)
    .then(data => {
      res.status(201).send(data)
    })
    .catch((err: Error & { name: string }) => {
      if (err.name === 'SequelizeDatabaseError') {
        res.status(422).send({
          message: err.message
        })
      } else {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Search Session.'
        })
      }
    })
}

export const findOne = (req: Request, res: Response): void => {
  const uuid = req.params.uuid as string

  if (!isValidUUID(uuid)) {
    res.status(400).send({ message: 'Invalid UUID syntax' })
    return
  }

  const includeParam = req.query.include as string | undefined
  const includeOptions = includeParam?.includes('proposals') ? { include: [Proposal] } : {}

  SearchSession.findByPk(uuid, includeOptions)
    .then(searchSession => {
      if (searchSession) {
        res.send(searchSession)
      } else {
        res.status(404).send({
          message: `Cannot find Search Session with uuid=${uuid}.`
        })
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error retrieving Search Session with uiid=${uuid}`
      })
    })
}

export const update = (req: Request, res: Response): void => {
  const uuid = req.params.uuid as string

  if (!isValidUUID(uuid)) {
    res.status(400).send({ message: 'Invalid UUID syntax' })
    return
  }

  SearchSession.findByPk(uuid)
    .then(searchSession => {
      if (searchSession) {
        searchSession.update(req.body)
          .then(searchSession => {
            res.send(searchSession)
          })
          .catch((err: Error & { name: string }) => {
            if (err.name === 'SequelizeDatabaseError') {
              res.status(422).send({
                message: err.message
              })
            } else {
              throw (err)
            }
          })
      } else {
        res.status(404).send({
          message: `Cannot find Search Session with uuid=${uuid}.`
        })
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error updating Search Session with uuid=${uuid}`
      })
    })
}
