const helper = require('../utils/helper.util')
const db = require('../models')
const SearchSession = db.search_sessions
const Proposal = db.proposals
const Title = db.titles
const Video = db.videos
const ProposalCreatorService = require('../services/proposal_creator.service')

exports.create = async (req, res) => {
  const searchSessionUUID = req.query.search_session_uuid

  if (!searchSessionUUID) {
    res.status(400).send({ message: 'Missing search_session_uuid param' })
    return
  } else if (!helper.isValidUUID(searchSessionUUID)) {
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

  const ProposalCreatorServiceInstance = new ProposalCreatorService(searchSession.uuid)
  const serviceRes = await ProposalCreatorServiceInstance.perform()

  if (serviceRes.success) {
    res.status(201).send(serviceRes.body)
  } else {
    res.status(500).send({ message: serviceRes.error })
  }
}

exports.findOne = (req, res) => {
  const uuid = req.params.uuid

  if (!helper.isValidUUID(uuid)) {
    res.status(400).send({ message: 'Invalid UUID syntax' })
    return
  }

  Proposal.findByPk(uuid, { include: [{ model: Title, include: [Video] }] })
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

exports.findAll = async (req, res) => {
  const searchSessionUUID = req.query.search_session_uuid

  if (!searchSessionUUID) {
    res.status(400).send({ message: 'Missing search_session_uuid param' })
    return
  } else if (!helper.isValidUUID(searchSessionUUID)) {
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

  Proposal.findAll({ where: { search_session_uuid: searchSession.uuid }, include: [{ model: Title, include: [Video] }] })
    .then(proposals => {
      res.send(proposals)
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error retrieving Proposals for search_session_uuid=${searchSessionUUID}`
      })
    })
}

exports.update = (req, res) => {
  const uuid = req.params.uuid

  if (!helper.isValidUUID(uuid)) {
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
          .catch(err => {
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
