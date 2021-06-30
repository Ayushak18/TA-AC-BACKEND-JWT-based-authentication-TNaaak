let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

mongoose.connect(
  'mongodb://localhost/APIBooks',
  { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Database Connected');
    }
  }
);

let bookRouterV1 = require('./routes/bookStoreV1');
let bookRouterV2 = require('./routes/bookStoreV2');
let userRouter = require('./routes/user');

let app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/books', bookRouterV1);
app.use('/api/v2/books', bookRouterV2);
app.use('/api/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
