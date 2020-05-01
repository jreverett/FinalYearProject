const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

// Get user
router.get('/users', (req, res, next) => {
  if (req.query.id) {
    User.findById(req.query.id, (err, user) => {
      // Error finding user
      if (err) {
        return res.status(400).send({
          message: 'Invalid request: ' + err,
        });
      }

      // No user with the requested ID exists
      if (!user) {
        return res
          .status(404)
          .send({ message: "Couldn't find a user matching the requested ID" });
      }

      // Valid request, return user
      return res.status(200).send({ data: user });
    });
  } else {
    User.find({}, (err, users) => {
      // Error occured finding users
      if (err) {
        return res.status(500).send({
          message: 'Invalid request: ' + err,
        });
      }

      // No users in the database
      if (!users.length) {
        return res.status(500).send({ message: 'No users found' });
      }

      // Valid request, return users
      return res.status(200).send({ data: users });
    });
  }
});

module.exports = router;
