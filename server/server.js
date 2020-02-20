const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const testAPIRouter = require('./api/routes/testAPI');

//////////////////////////////////////////////////////////////
// SERVER SETUP
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// routing
app.use('/testAPI', testAPIRouter);

// catch 404's and send them to the error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // only show error in dev mode
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  // show error page
  res.status(err.status || 500);
  res.json({ message: err.message, error: err });
});

//////////////////////////////////////////////////////////////
// MONGODB
var db = mongoose.connection;
const mongoString = process.env.MONGODB_URL;

// setup listeners
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
  console.log('[mongodb] connection established with MongoDB');
});

app.listen(port, () => console.log(`listening on port ${port}`));
