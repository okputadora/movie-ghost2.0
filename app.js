var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose')
var index = require('./routes/index');
var users = require('./routes/api');
require('dotenv').config();

var app = express();

mongoose.connect(process.env.MONGO_URI, (err, res) => {
  if (err){
    // console.log('DB CONNECTION FAILED: '+err)
  }
  else{
    // console.log('DB CONNECTION SUCCESS: '+ process.env.MONGO_URI)
  }
})

// setup session storage
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 60 * 60 * 1000}
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', users);
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, function(err, res){
  if(err){
    console.log('DB connection failed' + process.env.MONGODB_URI)
  }
  else{
    console.log('DB connection successfull ' + process.env.MONGODB_URI)
  }
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
