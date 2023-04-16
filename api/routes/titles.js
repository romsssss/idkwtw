var express = require('express');
var router = express.Router();
const titles = require("../controllers/titles.controller.js");

// GET titles listing
router.get('/', titles.search);

// Retrieve a title
router.get('/:tconst', titles.findOne);

module.exports = router;
