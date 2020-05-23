const express = require('express');
const router = express.Router();
const verificationService = require('../../services/verifyResetToken');

router.patch('/reset-password', (req, res, next) => {
  // check token is valid
  verificationService.verifyResetToken(req.body.token, (err, success) => {
    if (err) {
      return res.status(500).send({ message: 'Error resetting password' });
    }

    // if valid, update the user's password and remove remove the reset token
    success.user.setPassword(req.body.password);
    success.user.resetToken = null;
    success.user.resetTokenExpiration = null;
    success.user.save();
    return res.status(200).send({ message: 'Password successfully updated' });
  });
});

module.exports = router;
