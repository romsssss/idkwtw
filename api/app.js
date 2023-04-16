var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
require('dotenv').config()

var indexRouter = require('./routes/index');
var proposalsRouter = require('./routes/proposals');
var SearchSessionsRouter = require('./routes/search_sessions');
var titlesRouter = require('./routes/titles');

var app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/proposals', proposalsRouter);
app.use('/search_sessions', SearchSessionsRouter);
app.use('/titles', titlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    status: err.status,
    stack: err.stack
  })
});

module.exports = app;
