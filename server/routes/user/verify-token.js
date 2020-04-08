const express = require('express');
const router = express.Router();
const verificationService = require('../../services/verifyResetToken');

router.post('/verify-token', (req, res, next) => {
  verificationService.verifyResetToken(req.body.token, (err, success) => {
    if (err) {
      return res.status(err.status).send({ message: err.message });
    }

    return res
      .status(success.status)
      .send({ message: success.message, user: success.user });
  });
});

module.exports = router;
