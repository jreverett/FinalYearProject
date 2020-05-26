const express = require('express');
const router = express.Router();

router.use(require('./users'));
router.use('/user', require('./login'));
router.use('/user', require('./forgot-password'));
router.use('/user', require('./reset-password'));
router.use('/user', require('./verify-token'));
router.use('/user', require('./subscribe'));
router.use('/user', require('./unsubscribe'));

module.exports = router;
