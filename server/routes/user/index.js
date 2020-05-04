const express = require('express');
const router = express.Router();

router.use('/user', require('./signup'));
router.use(require('./users'));
router.use('/user', require('./login')); // TODO: move to a seperate 'authentication' router
router.use('/user', require('./forgot-password'));
router.use('/user', require('./reset-password'));
router.use('/user', require('./verify-token'));
router.use('/user', require('./update'));
router.use('/user', require('./subscribe'));
router.use('/user', require('./unsubscribe'));
router.use('/user', require('./delete'));

module.exports = router;
