const mongoose = require('mongoose');

const TopicSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = Topic = mongoose.model('Topic', TopicSchema);
