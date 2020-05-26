const express = require('express');
const router = express.Router();
const verifyAuthToken = require('../../services/verifyAuthToken');

// import user schema
const User = require('../../model/user');

///////////////////
// CREATE
///////////////////

// User signup
router.post('/users', (req, res) => {
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

///////////////////
// READ
///////////////////

router.get('/users', (req, res) => {
  if (req.query.id) {
    User.findById(req.query.id, (err, user) => {
      // Error finding user
      if (err) {
        return res.status(500).send({
          message: 'Error getting user',
        });
      }

      // No user with the requested ID exists
      if (!user) {
        return res
          .status(400)
          .send({ message: "Couldn't find a user matching the requested ID" });
      }

      // Valid request, return user
      return res.status(200).send({ data: user });
    });
  } else {
    User.find({}, (err, users) => {
      // Error occured finding users
      if (err) {
        return res.status(500).send({
          message: 'Error getting users: ' + err,
        });
      }

      // No users in the database
      if (!users.length) {
        return res.status(500).send({ message: 'No users found' });
      }

      // Valid request, return users
      return res.status(200).send({ data: users });
    });
  }
});

///////////////////
// UPDATE
///////////////////

router.patch(
  '/users',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res) => {
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

///////////////////
// DELETE
///////////////////

router.delete(
  '/users',
  (req, res, next) => {
    verifyAuthToken(req, res, next);
  },
  (req, res) => {
    const userID = req.body.userID;

    if (!userID) {
      return res.status(400).send({
        message: 'Invalid request: No user ID requested',
      });
    }

    User.findById(userID, (err, user) => {
      if (err) {
        return res.status(500).send({
          message: 'Error deleting user: ' + err,
        });
      }

      // No user with the requested ID exists
      if (!user) {
        return res
          .status(404)
          .send({ message: "Couldn't find a user matching the requested ID" });
      }

      // Valid request, delete user
      User.deleteOne(user, (err) => {
        if (err) {
          return res.status(500).send({
            message: 'Error deleting user: ' + err,
          });
        }

        // user deleted
        return res.status(204).send();
      });
    });
  }
);

module.exports = router;
