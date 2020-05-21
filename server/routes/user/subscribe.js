const express = require('express');
const router = express.Router();
const verifyAuthToken = require('../../services/verifyAuthToken');

// import user and event schema
const User = require('../../model/user');
const Event = require('../../model/event');

// Subscribe user to event
router.post(
  '/subscribe',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res) => {
    // verify the target event exists
    Event.findById(req.body.eventID, (err, event) => {
      if (err) {
        return res.status(500).send({
          message: 'Failed to subscribe: ' + err,
        });
      }
      if (!event) {
        return res.status(500).send({
          message: 'Failed to subscribe: Could not find the specifed event',
        });
      }

      // event exists, find the user
      User.findById(req.body.userID, (err, user) => {
        if (err) {
          return res.status(500).send({
            message: 'Failed to subscribe: ' + err,
          });
        }
        if (!user) {
          return res.status(500).send({
            message: 'Failed to subscribe: Could not find the specifed user',
          });
        }

        // user exists, subscribe them to the event if not already subbed
        if (user.subscriptions.includes(event._id)) {
          return res.status(500).send({
            message:
              'Failed to subscribe: User is already subscribed to this event',
          });
        }

        // update user and event
        user.subscriptions.push(event._id);
        user.save();
        event.subscribers.push(user._id);
        event.save();

        return res.status(200).send({
          message: 'Subscription successful',
        });
      });
    });
  }
);

module.exports = router;
