const express = require('express');
const router = express.Router();

// import user and event schema
const User = require('../../model/user');
const Event = require('../../model/event');

// Subscribe user to event
router.post('/unsubscribe', (req, res, next) => {
  // verify the target event exists
  Event.findById(req.body.eventID, (err, event) => {
    if (err) {
      return res.status(500).send({
        message: 'Failed to unsubscribe: ' + err
      });
    }
    if (!event) {
      return res.status(500).send({
        message: 'Failed to unsubsribe: Could not find the specifed event'
      });
    }

    // event exists, find the user
    User.findById(req.body.userID, (err, user) => {
      if (err) {
        return res.status(500).send({
          message: 'Failed to unsubscribe: ' + err
        });
      }
      if (!user) {
        return res.status(500).send({
          message: 'Failed to unsubsribe: Could not find the specifed user'
        });
      }

      const index = user.events.indexOf(event._id);
      if (!(index > -1)) {
        return res.status(500).send({
          message: 'Failed to unsubsribe: User is not subscribed to this event'
        });
      }

      user.events.splice(index, 1);
      user.save();

      return res.status(200).send({
        message: 'Subscription successful'
      });
    });
  });
});

module.exports = router;
