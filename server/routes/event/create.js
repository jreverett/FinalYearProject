const express = require('express');
const router = express.Router();

// import event schema
const Event = require('../../model/event');
const User = require('../../model/user');

router.post('/create', (req, res, next) => {
  User.findById(req.body.owner, (userErr, user) => {
    // create new event document
    let newEvent = new Event();

    // find and update user document
    if (userErr) {
      return res.status(500).send({
        message: 'Invalid request: ' + err
      });
    }

    user.ownedEvents.push(newEvent._id);

    // set event properties
    newEvent.owner = user._id;
    newEvent.title = req.body.title;
    newEvent.description = req.body.description;
    newEvent.start = req.body.start;
    newEvent.end = req.body.end;
    newEvent.cost = req.body.cost;
    newEvent.address = req.body.address;
    newEvent.images = req.body.images;

    // save the new event
    newEvent.save(eventErr => {
      if (eventErr) {
        return res.status(500).send({
          message: 'Failed to create event: ' + eventErr
        });
      } else {
        // event save successful, so save the user
        user.save();
        return res.status(201).send({
          message: 'Event added successfully'
        });
      }
    });
  });
});

module.exports = router;
