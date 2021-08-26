// router enigne setup


var cookieParser = require('cookie-parser');
var express = require('express');
var logger = require('morgan');
var cors = require('cors')
var app = express();

var createError = require('http-errors');
var path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors())

// import routes

var createUserRouter = require('./routes/createUser');
var getUserInfoRouter = require('./routes/getUserInfo');
var updateUserInfoRouter = require('./routes/updateUserInfo');
var changePasswordRouter = require('./routes/changePassword');
var exampleDecodeRouter = require('./routes/exampleDecode');
var indexRouter = require('./routes/index');

// define endpoints

app.use('/', indexRouter);
app.use('/createUser', createUserRouter);
app.use('/exampleDecode', exampleDecodeRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/getUserInfo', getUserInfoRouter);
app.use('/updateUserInfo', updateUserInfoRouter);

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
  res.render('error');
});

module.exports = app;