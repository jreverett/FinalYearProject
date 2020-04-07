const express = require('express');
const router = express.Router();

router.use('/user', require('./signup')); // CREATE
router.use(require('./users')); // READ
router.use('/user', require('./login')); // TODO: move to a seperate 'authentication' router
router.use('/user', require('./forgot-password'));
router.use('/user', require('./verify-token'));
router.use('/user', require('./update')); // UPDATE
router.use('/user', require('./subscribe'));
router.use('/user', require('./unsubscribe'));
router.use('/user', require('./delete')); // DELETE

module.exports = router;
