const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
mongoose.set('useCreateIndex', true);

const userRouter = require('./routes/user');
const eventRouter = require('./routes/event');
const topicRouter = require('./routes/topic');

//////////////////////////////////////////////////////////////
// SERVER SETUP
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase the payload limit to allow for multiple image uploads
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, '../client/build')));

// routing
app.use('/api', userRouter);
app.use('/api', eventRouter);
app.use('/api', topicRouter);

// heroku + react router bug fix
app.get('*', (req, res) => {
  let url = path.join(__dirname, '../client/build', 'index.html');
  res.sendFile(url);
});

//////////////////////////////////////////////////////////////
// MONGODB
var db = mongoose.connection;
const mongoString = process.env.MONGODB_URL;

// setup listeners
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('[mongodb] connection established with MongoDB');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
  mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});
