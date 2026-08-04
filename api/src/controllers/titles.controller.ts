import { Request, Response } from 'express'
import db from '../models'
import WatchProviderService from '../services/watch_provider.service'

const Title = db.titles
const Video = db.videos

const DEFAULT_REGION = 'US'

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

export const watchProviders = async (req: Request, res: Response): Promise<void> => {
  const tconst = req.params.tconst as string
  const region = (req.query.region as string) || (req.headers['x-vercel-ip-country'] as string) || DEFAULT_REGION

  const title = await Title.findByPk(tconst)
  if (!title) {
    res.status(404).send({ message: `Cannot find Title with tconst=${tconst}.` })
    return
  }

  const serviceRes = await new WatchProviderService(tconst, region).perform()

  if (serviceRes.success) {
    res.send(serviceRes.body)
  } else {
    res.status(502).send({ message: serviceRes.error.message })
  }
}
