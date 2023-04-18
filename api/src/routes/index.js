const express = require('express')
const router = express.Router()
const home = require('../controllers/home.controller.js')

// Home page (ping)
router.get('/', home.ping)

// DB sync endpoint
router.get('/sync', home.sync)

module.exports = router
