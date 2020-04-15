const express = require('express');
const router = express.Router();

// import event schema
const Event = require('../../model/event');
const User = require('../../model/user');

router.post('/announcement', (req, res, next) => {
  // find event
  // verify requester is event owner
  // get array of subscribed users
  // for each user:
  // if immediate send: send email content now
  // if scheduled send: setup node-cron job
});

module.exports = router;
