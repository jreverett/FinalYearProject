const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

// User signup
router.post('/signup', (req, res, next) => {
  // check if a user with this email already exists
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: 'Failed to add user' });

    if (user.length)
      return res
        .status(500)
        .send({ message: 'A user with this email already exists' });
  });

  let newUser = new User();

  newUser.type = 0; // 0 = Standard, 1 = Admin
  newUser.firstname = req.body.firstname;
  newUser.lastname = req.body.lastname;
  newUser.email = req.body.email;
  newUser.address = req.body.address ? req.body.address : '';
  newUser.setPassword(req.body.password);
  newUser.verified = false;
  newUser.resetToken = '';
  newUser.resetTokenExpiration = '';

  newUser.save((err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'Failed to add user',
      });
    } else {
      return res.status(201).send({
        message: 'User added successfully',
      });
    }
  });
});

module.exports = router;
