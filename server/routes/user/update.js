const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

// User update
router.post('/update', (req, res, next) => {
  User.findById(req.body.id, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'Failed to update user: ' + err
      });
    }

    const {
      email,
      emailConsent,
      address,
      currentPassword,
      newPassword
    } = req.body;

    user.email = email;
    user.emailConsent = emailConsent;
    user.address = address;
    if (newPassword) {
      if (user.passwordIsValid(currentPassword)) {
        user.setPassword(newPassword);
      } else {
        return res.status(500).send({
          message: 'Current password is invalid'
        });
      }
    }

    user.save();

    return res.status(200).send({
      message: 'User updated successfully'
    });
  });
});

module.exports = router;
