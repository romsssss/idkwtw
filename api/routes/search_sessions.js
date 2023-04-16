var express = require('express');
var router = express.Router();
const search_sessions = require("../controllers/search_sessions.controller.js");

// Retrieve a search session
router.get('/:uuid', search_sessions.findOne);

// Create a new search session
router.post("/", search_sessions.create);

// Update a search session
router.put("/:uuid", search_sessions.update);

module.exports = router;
