const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

router.post('/login', (req, res) => {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (user === null) {
      return res.status(400).send({
        message: 'User not found'
      });
    } else {
      if (user.passwordIsValid(req.body.password)) {
        return res.status(200).send({
          message: 'User logged in'
        });
      } else {
        return res.status(400).send({
          message: 'Wrong password'
        });
      }
    }
  });
});

module.exports = router;
