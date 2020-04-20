require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Topic = require('../model/topic');

const topics = [
  { name: 'Performing Arts' },
  { name: 'Charities & Causes' },
  { name: 'Religion & Spirituality' },
  { name: 'Hobbies & Special Interests' },
  { name: 'Sports & Fitness' },
  { name: 'Film, Media & Entertainment' },
  { name: 'Music' },
  { name: 'Government & Politics' },
  { name: 'Fashion & Beauty' },
  { name: 'Travel & Outdoor' },
  { name: 'Other' },
];

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Topic.create(topics, (err, topics) => {
  if (err) {
    return console.log(err);
  }

  console.log(`Inserted ${topics.length} documents to 'topics'`);
});
