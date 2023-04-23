const db = require('../models')
const Title = db.titles

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
