const express = require('express');
const router = express.Router();

// import event schema
const Event = require('../../model/event');

router.post('/create', (req, res, next) => {
  let newEvent = new Event();

  newEvent.owner = req.body.owner;
  newEvent.title = req.body.title;
  newEvent.description = req.body.description;
  newEvent.start = req.body.start;
  newEvent.end = req.body.end;
  newEvent.cost = req.body.cost;
  newEvent.address = req.body.address;
  newEvent.images = req.body.images;

  newEvent.save((err, Event) => {
    if (err) {
      return res.status(500).send({
        message: 'Failed to create event: ' + err
      });
    } else {
      return res.status(201).send({
        message: 'Event added successfully'
      });
    }
  });
});

module.exports = router;
