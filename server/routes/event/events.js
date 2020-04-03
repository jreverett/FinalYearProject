const express = require('express');
const router = express.Router();

// import event schema
const Event = require('../../model/event');

router.get('/events', (req, res, next) => {
  if (req.query.id) {
    Event.findById(req.query.id, (err, event) => {
      // Error occured finding events
      if (err) {
        return res.status(500).send({
          message: 'Invalid request: ' + err
        });
      }

      // No event with the request ID exists
      if (!event) {
        return res.status(500).send({ message: 'No events found' });
      }

      // Valid request, return event
      return res.status(200).send({ data: event });
    });
  } else {
    Event.find({}, (err, events) => {
      // Error occured finding events
      if (err) {
        return res.status(500).send({
          message: 'Invalid request: ' + err
        });
      }

      // No events in the database
      if (!events.length) {
        return res.status(500).send({ message: 'No events found' });
      }

      // Valid request, return events
      return res.status(200).send({ data: events });
    });
  }
});

module.exports = router;
