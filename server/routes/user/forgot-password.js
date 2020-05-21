const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const config = require('../../config');
const User = require('../../model/user');
const emailService = require('../../services/email');

router.post('/forgot-password', (req, res, next) => {
  if (!req.body.email) {
    return res.status(400).send({ message: 'Email is required' });
  }

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res
        .status(500)
        .send({ message: 'Failed to send reset password reset email: ' + err });
    }
    if (!user) {
      // for security reasons, this response should be the same as when a user is found
      return res.status(204).send();
    }

    const token = crypto.randomBytes(20).toString('hex');
    user
      .updateOne({
        resetToken: token,
        resetTokenExpiration: Date.now() + 1200000,
      })
      .exec();

    const mailOptions = {
      from: 'Upvent ☁️ <accounts@upvent.com>', // 'from' email cannot be customised when using gmail as host
      to: `${user.email}`,
      subject: 'Password Reset Request',
      html: `<p>You are receiving this email because a password reset request was made for your account.</p>
        <p>If you made this request, <a href='${config.API_URL}/reset-password/${token}'>click here</a> to continue the password reset process within 20 minutes.</p>
        <p>If you did not make this request, please ignore this email and your password will remain unchanged.</p>
        <br />
        <p>Note: To keep your account secure, do not share this link with anyone else.</p>`,
    };

    emailService.send(mailOptions);
    return res.status(204).send();
  });
});

module.exports = router;
