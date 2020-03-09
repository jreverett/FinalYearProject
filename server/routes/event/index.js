const express = require('express');
const router = express.Router();

router.use('/event', require('./create'));
router.use(require('./events'));

module.exports = router;
