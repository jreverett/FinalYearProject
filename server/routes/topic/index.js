const express = require('express');
const router = express.Router();

router.use(require('./topics')); // READ

module.exports = router;
