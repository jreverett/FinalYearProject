const verifyAuthToken = require('../../services/verifyAuthToken');
const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

router.post('/delete', verifyAuthToken, (req, res, next) => {
  var user = req.body.email;

  if (!user) {
    return res.status(400).send({
      message: 'Failed to delete user: No email specified',
    });
  }

  User.collection.deleteOne(user, (err) => {
    if (err) {
      return res.status(500).send({
        message: 'Failed to delete user: ' + err,
      });
    } else {
      return res.status(200).send({
        message: 'User successfully deleted',
      });
    }
  });
});

module.exports = router;
