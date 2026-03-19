import { Router } from 'express'
import * as titles from '../controllers/titles.controller'

const router = Router()

// Retrieve a title
router.get('/:tconst', titles.findOne)

export default router
