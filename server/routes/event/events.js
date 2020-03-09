const express = require('express');
const router = express.Router();

// import event schema
const Event = require('../../model/event');

router.get('/events', (req, res, next) => {
  Event.find({}, (err, events) => {
    // Error occured finding events
    if (err) {
      return res.status(400).send({
        message: 'Invalid request: ' + err
      });
    }

    // No events in the database
    if (!events.length) {
      return res.status(404).send({ message: 'No events found' });
    }

    // Valid request, return events
    return res.status(200).send({ data: events });
  });
});

module.exports = router;
