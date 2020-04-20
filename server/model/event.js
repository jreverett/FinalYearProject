const mongoose = require('mongoose');

// create user schema
const EventSchema = mongoose.Schema({
  owner: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
  cost: {
    type: Number,
  },
  address: {
    type: Object,
  },
  images: {
    type: Array,
  },
  subscribers: {
    type: Array,
  },
});

module.exports = Event = mongoose.model('Event', EventSchema);
