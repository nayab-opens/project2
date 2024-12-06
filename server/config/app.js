let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let flash = require('connect-flash');
let cors = require('cors');
let mongoose = require('mongoose');

// Define the User model
let userModel = require('../model/User');
let User = userModel.User;

// Initialize Passport strategy AFTER defining User
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Define routes
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let jewelleriesRouter = require('../routes/jewelleries');

// MongoDB connection
let DB = require('./db');
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error'));
mongoDB.once('open', () => {
  console.log('MongoDB Connected');
});

let app = express();

// Set up express-session
app.use(
  session({
    secret: 'SomeSecret',
    saveUninitialized: false,
    resave: false,
  })
);

// Initialize flash and passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/jewellerieslist', jewelleriesRouter);

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});

module.exports = app;
