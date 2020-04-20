const express = require('express');
const router = express.Router();

// import event schema
const Topic = require('../../model/topic');

router.get('/topics', (req, res, next) => {
  Topic.find({}, (err, topics) => {
    // Error occured finding topics
    if (err) {
      return res.status(500).send({
        message: 'Error retrieving topics: ' + err,
      });
    }

    // No topics in the database
    if (!topics.length) {
      return res.status(500).send({ message: 'No topics found' });
    }

    // Valid request, return topics
    return res.status(200).send({ data: topics });
  });
});

module.exports = router;
