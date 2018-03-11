var express = require('express');
var path = require('path');

//standard middleware
var logger = require('morgan');
var bodyParser = require('body-parser');
const session = require('express-session');

// mongoose
require('./database.js');
const Room = require('./models/Room.js');
const Message = require('./models/Message.js');
const User = require('./models/User.js');
const UserDetail = require('./models/UserDetail.js');

// passport.js
const passport = require('./passport.js')(User);

// routes
const authRouter = require('./routes/auth')(User, UserDetail);

// ____________________________________________________________

var app = express();

// server setup from bin/www
var http = require('http');
var port = process.env.PORT || '3000';
app.set('port', port);
var server = http.createServer(app);
server.listen(port);

// session setup ____________________________________________________________

app.use(session({
  secret: 'asdlkj4ljlkdf',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false // change for production!
  }
}));



// webpack setup ____________________________________________________________

const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/assets/',
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

app.use(require('webpack-hot-middleware')(compiler, {
  log: console.log,
  path: '/__webpack_hmr',
  heartbeat: 10 * 1000
}));


// middleware setup _________________________________________________

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(passport.initialize());
app.use(passport.session());

// routes ____________________________________________________________


app.post('/auth/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));
app.use('/auth', authRouter);

app.get('/rooms', (req, res) => {
  Room.find((err, doc) => {
    res.send(doc);
  });
});

app.get('/messages', (req, res) => {
  Message.find((err, doc) => {
    if (err) {
      console.log('Error retrieving messages from db: ' + err);
    }
    res.send(doc);
  });
});



app.get('/*', ((req, res) => {
  if (!req.isAuthenticated()) {
    res.render('login', {
      message: req.session.message
    });
  } else {
    const userId = req.user;
    UserDetail.findOne({
      _id: userId
    }, (err, user) => { // pass logged in users detail  to react ChatView
      res.render('index', {
        user
      });
    });
  }
}));

// app.get('/', (req, res) => {
//   const isAuth = req.isAuthenticated ? req.isAuthenticated() : 'Not authenticated';
//   res.send(isAuth);
// });



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ?
    err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

require('./handleWebSocket')(server, Room, Message, UserDetail);

module.exports = app;