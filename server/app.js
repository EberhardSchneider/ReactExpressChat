var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

const guid = require('guid');

var index = require('./routes/index');
var app = express();

// server setup from bin/www

var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);


// webpack setup

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

// --------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));

// ____________________________________________________________ ROUTES

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/users', (req, res) => {
  res.send(users);
});

app.use('/rooms', (req, res) => {
  res.send(rooms);
});

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

// web socket handling

let users = {};
let rooms = {};
let roomId = undefined;

/**
users: {
  socket.id: {
    name: String
    room: String of room id
  }
}
**/

var io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Connection started...');

  socket.on('add user', (data) => {
    const newUser = {
      name: data.name,
      roomId: undefined
    };
    users[socket.id] = newUser;
    triggerUserUpdate(socket);
  });

  socket.on('add room', (data) => {
    const newRoom = {
      name: data.name
    };
    rooms[guid.raw()] = newRoom;
    triggerRoomUpdate(socket);
  });

  socket.on('new message', (data) => {
    const message = {
      id: guid.raw(),
      userId: socket.id,
      roomId: roomId,
      body: data.message
    };
    socket.broadcast.emit('new message', message);
    socket.emit('new message', message);
  });

  socket.on('join room', (data) => {
    users[socket.id].roomId = data.key;
    roomId = data.key;
    triggerUserUpdate(socket);
  });

  socket.on('disconnecting', () => {
    delete users[socket.id];
    socket.broadcast.emit('users updated', {
      users: users
    });

    triggerUserUpdate(socket);


  });

});

// ____________________________________________________________


function triggerUserUpdate(socket) {
  socket.broadcast.emit('users updated', {
    users: users
  });
  socket.emit('users updated', {
    users: users
  });
}

function triggerRoomUpdate(socket) {
  socket.broadcast.emit('rooms updated', {
    rooms: rooms
  });
  socket.emit('rooms updated', {
    rooms: rooms
  });
}

module.exports = app;