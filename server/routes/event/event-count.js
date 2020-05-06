const express = require('express');
const router = express.Router();

// import event schema
const Event = require('../../model/event');

router.get('/event-count', (req, res, next) => {
  Event.countDocuments({}, (err, count) => {
    if (err) {
      return res.status(500).send({
        message: 'Error getting event count: ' + err,
      });
    }

    return res.status(200).send({ data: count });
  });
});

module.exports = router;
