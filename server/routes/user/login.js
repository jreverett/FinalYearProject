const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user === null) {
      // Account with this email does not exist
      return res.status(400).send({
        message: 'Invalid credentials'
      });
    } else {
      if (user.passwordIsValid(req.body.password)) {
        return res.status(200).send({
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          emailConsent: user.emailConsent,
          address: user.address,
          verified: user.verified,
          events: user.events,
          token: 'test-token' // TODO: add token generation/storage in MongoDB
        });
      } else {
        // Incorrect password for this account
        return res.status(400).send({
          message: 'Invalid credentials'
        });
      }
    }
  });
});

module.exports = router;
