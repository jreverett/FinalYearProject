const mongoose = require('mongoose');

// create user schema
const EventSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date
  },
  cost: {
    type: Number
  },
  images: {
    type: Array
  }
});

module.exports = Event = mongoose.model('Event', EventSchema);
