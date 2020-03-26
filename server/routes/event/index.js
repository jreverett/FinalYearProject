const express = require('express');
const router = express.Router();

router.use('/event', require('./create')); // CREATE
router.use(require('./events')); // READ

module.exports = router;
