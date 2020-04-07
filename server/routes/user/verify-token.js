const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

router.post('/verify-token', (req, res, next) => {
  if (!req.body.token) {
    return res.status(400).send({ message: 'Token is required' });
  }

  // verify token exists
  User.findOne({ resetToken: req.body.token }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .send({ message: 'Failed to verify token: ' + err });
    }
    if (!user) {
      return res
        .status(500)
        .send({
          message: 'Token does not exist, please request a new reset link'
        });
    }

    // verify token has not expired
    if (user.resetTokenExpiration.getTime() < Date.now()) {
      return res
        .status(500)
        .send({
          message: 'Token has expired, please request a new reset link'
        });
    }

    // token is valid
    return res.status(200).send({ message: 'VALID', user: user });
  });
});

module.exports = router;
