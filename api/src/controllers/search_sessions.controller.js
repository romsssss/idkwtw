const helper = require('../utils/helper.util')
const db = require('../models')
const SearchSession = db.search_sessions
const Proposal = db.proposals

exports.create = (req, res) => {
  const searchSessionParams = {
    public: req.body.public,
    genres: req.body.genres
  }

  SearchSession.create(searchSessionParams)
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
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

exports.findOne = (req, res) => {
  const uuid = req.params.uuid

  if (!helper.isValidUUID(uuid)) {
    res.status(400).send({ message: 'Invalid UUID syntax' })
    return
  }

  const includeParam = req.query.include
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

exports.update = (req, res) => {
  const uuid = req.params.uuid

  if (!helper.isValidUUID(uuid)) {
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
