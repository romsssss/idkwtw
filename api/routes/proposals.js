var express = require('express');
var router = express.Router();
const proposals = require("../controllers/proposals.controller.js");


// // Retrieve a list of proposals (for a given session)
router.get('/', proposals.findAll);

// Retrieve a proposal
router.get('/:uuid', proposals.findOne);

// Create a new proposal
router.post("/", proposals.create);

// Update a proposal
router.put("/:uuid", proposals.update);

module.exports = router;
