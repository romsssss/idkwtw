import { Router } from 'express'
import * as home from '../controllers/home.controller'

const router = Router()

// Home page (ping)
router.get('/', home.ping)

// DB sync endpoint
router.get('/sync', home.sync)

export default router
