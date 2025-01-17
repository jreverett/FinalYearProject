const mongoose = require('mongoose');
var crypto = require('crypto');

// create user schema
const UserSchema = mongoose.Schema({
  type: {
    type: Number,
    required: true,
    default: 0,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailConsent: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: Object,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
  ownedEvents: {
    type: Array,
  },
  subscriptions: {
    type: Array,
  },
  authToken: {
    type: String,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
  suspended: {
    type: Boolean,
    required: true,
    default: false,
  },
});

// Generate a password w/ salt
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  // password w/ a length of 64
  // 1000 hash iterations
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

// Check if the password is valid (using password payload and database salt)
// Hash the request and compare it to the stored value
UserSchema.methods.passwordIsValid = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash == hash;
};

module.exports = User = mongoose.model('User', UserSchema);
