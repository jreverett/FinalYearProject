const express = require('express');
const router = express.Router();

// import user schema
const User = require('../../model/user');

// User update
router.post('/update', (req, res, next) => {
  User.findByIdAndUpdate(
    req.body.id,
    req.body,
    { useFindAndModify: false },
    function(err, user) {
      if (err) {
        return res.status(500).send({
          message: 'Failed to update user: ' + err
        });
      } else {
        return res.status(200).send({
          message: 'User updated successfully'
        });
      }
    }
  );
});

module.exports = router;
