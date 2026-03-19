import { Request, Response } from 'express'
import db from '../models'

const Title = db.titles
const Video = db.videos

export const findOne = (req: Request, res: Response): void => {
  const tconst = req.params.tconst as string

  Title.findByPk(tconst, { include: [Video] })
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
