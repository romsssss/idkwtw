import { Router } from 'express'
import * as searchSessions from '../controllers/search_sessions.controller'

const router = Router()

// Retrieve a search session
router.get('/:uuid', searchSessions.findOne)

// Create a new search session
router.post('/', searchSessions.create)

// Update a search session
router.put('/:uuid', searchSessions.update)

export default router
