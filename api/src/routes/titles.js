const express = require('express')
const router = express.Router()
const titles = require('../controllers/titles.controller.js')

// Retrieve a title
router.get('/:tconst', titles.findOne)

module.exports = router
