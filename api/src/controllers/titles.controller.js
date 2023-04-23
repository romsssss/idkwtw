const db = require('../models')
const Title = db.titles
// const Op = db.Sequelize.Op

exports.search = (req, res) => {
  Title.findAll({
    where: {
      is_adult: true
      // start_year: {
      //   [Op.gt]: 2022
      // }
    }
  }).then(data => {
    res.send(data)
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving titles.'
      })
    })
}

exports.findOne = (req, res) => {
  const tconst = req.params.tconst

  Title.findByPk(tconst)
    .then(title => {
      if (title) {
        res.send(title)
      } else {
        res.status(404).send({
          message: `Cannot find Title with tconst=${tconst}.`
        })
      }
    })
    .catch(_err => {
      res.status(500).send({
        message: `Error retrieving Title with tconst=${tconst}`
      })
    })
}
