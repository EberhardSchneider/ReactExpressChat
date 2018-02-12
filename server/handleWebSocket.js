const guid = require('guid');

// global
let loggedInUsers = {};

function handleWebSocket(server, Room, Message) {

  var io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('Socket connection started...');
    socket.roomId = ''; // store current chat room id
    socket.userId = ''; // and user id of logged in user

    socket.on('add user', (user) => {
      socket.userId = user._id;
      loggedInUsers[socket.userId] = user;
      socket.emit('users updated', loggedInUsers);

      triggerUpdateAllUsers(socket);
    });

    socket.on('add room', (data) => {
      const newRoom = new Room(data);
      newRoom.save((err) => {
        if (err) {
          console.log('Could not store added room.');
        } else
          triggerUpdateAllRooms(socket);
      });
    });

    socket.on('new message', (data) => {
      const message = new Message({
        _id: guid.raw(),
        author: loggedInUsers[socket.userId].name,
        roomId: socket.roomId,
        body: data.message,
        date: new Date()
      });

      message.save((err) => {
        if (err) {
          console.error('Could not store message:');
          console.error(err);
        }

        socket.broadcast.emit('new message', message);
        socket.emit('new message', message);
      });

    });

    socket.on('join room', (data) => {
      loggedInUsers[socket.userId].roomId = data.key;
      socket.roomId = data.key;

      triggerUpdateOneUser(socket, socket.userId);
    });

    socket.on('disconnecting', () => {
      delete loggedInUsers[socket.userId];
      triggerUpdateAllUsers(socket);
    });
  });


  function triggerUpdateAllUsers(socket) {
    socket.broadcast.emit('users updated', loggedInUsers);
  }

  function triggerUpdateOneUser(socket, userId) {
    socket.broadcast.emit('user updated', {
      id: userId,
      user: loggedInUsers[userId]
    });
  }

  function triggerUpdateAllRooms(socket) {
    Room.find((err, doc) => {
      socket.broadcast.emit('rooms updated', {
        rooms: doc
      });
    });
  }
}


module.exports = handleWebSocket;