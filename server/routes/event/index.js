const express = require('express');
const router = express.Router();

router.use('/event', require('./create'));

module.exports = router;
