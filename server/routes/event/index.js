const express = require('express');
const router = express.Router();

router.use(require('./events'));
router.use('/event', require('./announcement'));
router.use('/event', require('./event-count'));

module.exports = router;
