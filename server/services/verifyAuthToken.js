const jwt = require('jsonwebtoken');
const User = require('../model/user');

function verifyAuthToken(req, res, next, adminRequired) {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(403).send({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ message: 'Failed to authenticate token: ' + err });

    User.findById(decoded.id, (err, user) => {
      if (err) {
        return res
          .status(500)
          .send({ message: 'An error occoured while authenticating' });
      }

      if (user.type !== 1) {
        // admin privileges required, verify user type
        if (adminRequired)
          return res
            .status(403)
            .send({ message: 'You do not have permission to do that' });

        // if not an admin, make sure they're not trying to modify other user's data
        if (req.body.userID != decoded.id) {
          return res
            .status(403)
            .send({ message: 'You do not have permission to do that' });
        }
      }

      // valid request and permissions
      next();
    });
  });
}

module.exports = verifyAuthToken;
