require('dotenv').config();
var bodyParser = require('body-parser');
var express = require('express');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var passport = require('./config/passportConfig');
var session = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var path = require('path');
var app = express();

/* Set up middleware */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'client', 'build')));

/* Controllers */
app.use('/auth', require('./controllers/auth'));

app.get('/profile', isLoggedIn, function(req, res){
  //res.render('profile');
  res.send("profile route");
});

/*Renders react stuff*/
app.get('*', function(req, res, next) {
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(process.env.PORT || 3000);