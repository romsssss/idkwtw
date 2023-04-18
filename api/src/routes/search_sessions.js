const express = require('express')
const router = express.Router()
const searchSessions = require('../controllers/search_sessions.controller.js')

// Retrieve a search session
router.get('/:uuid', searchSessions.findOne)

// Create a new search session
router.post('/', searchSessions.create)

// Update a search session
router.put('/:uuid', searchSessions.update)

module.exports = router
