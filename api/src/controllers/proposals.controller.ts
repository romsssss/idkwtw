import { Request, Response } from 'express'
import { isValidUUID } from '../utils/helper.util'
import db from '../models'
import ProposalCreatorService from '../services/proposal_creator.service'

const SearchSession = db.search_sessions
const Proposal = db.proposals
const Title = db.titles
const Video = db.videos

export const create = async (req: Request, res: Response): Promise<void> => {
  const searchSessionUUID = req.query.search_session_uuid as string

  if (!searchSessionUUID) {
    res.status(400).send({ message: 'Missing search_session_uuid param' })
    return
  } else if (!isValidUUID(searchSessionUUID)) {
    res.status(400).send({ message: 'Invalid Search Session UUID syntax' })
    return
  }

  const searchSession = await SearchSession.findByPk(searchSessionUUID)
  if (!searchSession) {
    res.status(404).send({
      message: `Unknown Search Session with uuid=${searchSessionUUID}.`
    })
    return
  }

  const proposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
  const serviceRes = await proposalCreatorServiceInstance.perform()

  if (serviceRes.success) {
    res.status(201).send(serviceRes.body)
  } else {
    res.status(500).send({ message: (serviceRes.error as Error).message })
  }
}

export const findOne = (req: Request, res: Response): void => {
  const uuid = req.params.uuid as string

  if (!isValidUUID(uuid)) {
    res.status(400).send({ message: 'Invalid UUID syntax' })
    return
  }

  const includeParam = req.query.include as string | undefined
  const includeOptions = includeParam?.includes('title') ? { include: [{ model: Title, include: [Video] }] } : {}

  Proposal.findByPk(uuid, includeOptions)
    .then(proposal => {
      if (proposal) {
        res.send(proposal)
      } else {
        res.status(404).send({
          message: `Cannot find Proposal with uuid=${uuid}.`
        })
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error retrieving Proposal with uuid=${uuid}`
      })
    })
}

export const findAll = async (req: Request, res: Response): Promise<void> => {
  const searchSessionUUID = req.query.search_session_uuid as string

  if (!searchSessionUUID) {
    res.status(400).send({ message: 'Missing search_session_uuid param' })
    return
  } else if (!isValidUUID(searchSessionUUID)) {
    res.status(400).send({ message: 'Invalid Search Session UUID syntax' })
    return
  }

  const searchSession = await SearchSession.findByPk(searchSessionUUID)
  if (!searchSession) {
    res.status(404).send({
      message: `Unknown Search Session with uuid=${searchSessionUUID}.`
    })
    return
  }

  const includeParam = req.query.include as string | undefined
  const includeOptions = includeParam?.includes('title') ? { include: [{ model: Title, include: [Video] }] } : {}

  Proposal.findAll({ where: { search_session_uuid: searchSession.uuid } as never, ...includeOptions })
    .then(proposals => {
      res.send(proposals)
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error retrieving Proposals for search_session_uuid=${searchSessionUUID}`
      })
    })
}

export const update = (req: Request, res: Response): void => {
  const uuid = req.params.uuid as string

  if (!isValidUUID(uuid)) {
    res.status(400).send({ message: 'Invalid UUID syntax' })
    return
  }

  Proposal.findByPk(uuid)
    .then(proposal => {
      if (proposal) {
        proposal.update(req.body)
          .then(proposal => {
            res.send(proposal)
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
          message: `Cannot find Proposal with uuid=${uuid}.`
        })
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error updating Proposal with uuid=${uuid}`
      })
    })
}
