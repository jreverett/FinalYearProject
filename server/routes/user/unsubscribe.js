const express = require('express');
const router = express.Router();
const verifyAuthToken = require('../../services/verifyAuthToken');

// import user and event schema
const User = require('../../model/user');
const Event = require('../../model/event');

// Subscribe user to event
router.post(
  '/unsubscribe',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res, next) => {
    // verify the target event exists
    Event.findById(req.body.eventID, (err, event) => {
      if (err) {
        return res.status(500).send({
          message: 'Failed to unsubscribe',
        });
      }
      if (!event) {
        return res.status(500).send({
          message: 'Failed to unsubsribe: Could not find the specifed event',
        });
      }

      // event exists, find the user
      User.findById(req.body.userID, (err, user) => {
        if (err) {
          return res.status(500).send({
            message: 'Failed to unsubscribe',
          });
        }
        if (!user) {
          return res.status(500).send({
            message: 'Failed to unsubsribe: Could not find the specifed user',
          });
        }

        // update user...
        let index = user.subscriptions.indexOf(event._id);
        if (!(index > -1)) {
          return res.status(500).send({
            message:
              'Failed to unsubsribe: User is not subscribed to this event',
          });
        }

        user.subscriptions.splice(index, 1);
        user.save();

        // and event
        index = event.subscribers.indexOf(user._id);
        event.subscribers.splice(index, 1);
        event.save();

        return res.status(200).send({
          message: 'Unsubscription successful',
        });
      });
    });
  }
);

module.exports = router;
