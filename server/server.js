var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');
const session = require('express-session');

const authRouter = require('./routes/auth');

require('./database.js');
const Room = require('./models/Room.js');
const Message = require('./models/Message.js');



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
    secure: true
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


// views setup ____________________________________________________________

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// routes ____________________________________________________________

app.use('/auth', authRouter);

app.get('/', ((req, res) => {
  if (!req.user) {
    res.render('login', {
      message: 'Hallo'
    }, (err, html) => {
      res.send(html);
    });
  } else {
    res.render('index');
  }
}));

app.get('/rooms', (req, res) => {
  Room.find((err, doc) => {
    res.send(doc);
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', ((req, res) => {
  if (req.body.username == 'Ebi' && req.body.password == 'Ebi') {
    req.session.username = 'Ebi';
    res.redirect('/');
  } else {
    res.redirect('/login');
  }
}));



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.table(req);
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

require('./chatSockets')(server, Room, Message);

module.exports = app;