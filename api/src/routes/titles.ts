import { Router } from 'express'
import * as titles from '../controllers/titles.controller'

const router = Router()

// Retrieve a title
router.get('/:tconst', titles.findOne)

// Retrieve watch providers for a title (region-aware)
router.get('/:tconst/watch', titles.watchProviders)

export default router
