import { Router } from 'express'
import * as proposals from '../controllers/proposals.controller'

const router = Router()

// // Retrieve a list of proposals (for a given session)
router.get('/', proposals.findAll)

// Retrieve a proposal
router.get('/:uuid', proposals.findOne)

// Create a new proposal
router.post('/', proposals.create)

// Update a proposal
router.put('/:uuid', proposals.update)

export default router
