const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (user === null) {
      // Account with this email does not exist
      return res.status(401).send({
        message: 'Invalid credentials',
      });
    } else {
      if (user.passwordIsValid(req.body.password)) {
        if (user.suspended) {
          return res.status(403).send({
            message: 'This account has been suspended',
          });
        }

        // create auth token (60 minute expiry)
        const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 3600,
        });

        // save the token to the user
        user.authToken = authToken;
        user.save();

        return res.status(200).send({
          _id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          emailConsent: user.emailConsent,
          address: user.address,
          verified: user.verified,
          ownedEvents: user.ownedEvents,
          subscriptions: user.subscriptions,
          authToken: authToken,
        });
      } else {
        // Incorrect password for this account
        return res.status(401).send({
          message: 'Invalid credentials',
        });
      }
    }
  });
});

module.exports = router;
