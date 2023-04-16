const db = require('../models')

exports.ping = (req, res) => {
  res.json({ ping: 'pong' })
}

exports.sync = (req, res) => {
  db.sequelize.sync({ force: true })
    .then(function () {
      res.status(200).send({ message: 'sync done' })
    })
    .catch(function (error) {
      res.status(500).send({ message: 'Error while syncing DB:' + error.message })
    })
}
