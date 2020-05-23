// import user schema
const User = require('../model/user');

function verifyResetToken(token, callback) {
  if (!token) {
    return callback({ status: 400, message: 'Token is required' });
  }

  // verify token exists
  User.findOne({ resetToken: token }, (err, user) => {
    if (err) {
      return callback({
        status: 500,
        message: 'Failed to verify token',
      });
    }
    if (!user) {
      return callback({
        status: 500,
        message: 'This reset link is invalid, please request a new one',
      });
    }

    // verify token has not expired
    if (user.resetTokenExpiration.getTime() < Date.now()) {
      return callback({
        status: 500,
        message: 'This reset link has expired, please request a new one',
      });
    }

    // token is valid - return no error and the data
    return callback(null, { status: 200, message: 'VALID', user: user });
  });
}

exports.verifyResetToken = verifyResetToken;
