const express = require('express');
const router = express.Router();

router.use('/user', require('./signup'));
router.use('/user', require('./login'));
// router.use('/user', require('./delete'));

module.exports = router;
