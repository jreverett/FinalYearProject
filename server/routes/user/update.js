const express = require('express');
const router = express.Router();
const verifyAuthToken = require('../../services/verifyAuthToken');

// import user schema
const User = require('../../model/user');

// User update
router.patch(
  '/update',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res, next) => {
    let params = {};

    // gather all non-null props
    for (let prop in req.body) {
      if (req.body[prop] != null) params[prop] = req.body[prop];
    }

    User.findOneAndUpdate(
      { _id: req.body.userID },
      params,
      { useFindAndModify: false },
      (err) => {
        if (err) {
          return res.status(500).send({
            message: 'Failed to update user',
          });
        } else {
          return res.status(204).send();
        }
      }
    );
  }
);

module.exports = router;
