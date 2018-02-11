const guid = require('guid');

let loggedInUsers = {};


// web socket handling
function chatSockets(server, Room, Message) {

  var io = require('socket.io')(server);



  io.on('connection', (socket) => {
    console.log('Connection started...');
    socket.roomId = '';

    socket.on('add user', (data) => {
      socket.userId = data._id;
      loggedInUsers[data._id] = data;
      socket.emit('user added', loggedInUsers);
      triggerUserUpdate(socket);
    });

    socket.on('add room', (data) => {
      const newRoom = new Room(data);
      newRoom.save((err) => {
        if (err) {
          console.log('Could not store added room.');
        } else
          triggerRoomUpdate(socket);
      });
    });

    socket.on('new message', (data) => {
      const message = new Message({
        _id: guid.raw(),
        userId: socket.userId,
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
      triggerUserUpdate(socket);

    });

    socket.on('disconnecting', () => {
      delete loggedInUsers[socket.userId];
      triggerUserUpdate(socket);
    });
  });


  function triggerUserUpdate(socket) {
    socket.broadcast.emit('users updated', loggedInUsers);
  }

  function triggerRoomUpdate(socket) {
    Room.find((err, doc) => {
      console.log('Rooms from Mongo:');
      console.log(doc);
      socket.broadcast.emit('rooms updated', {
        rooms: doc
      });
    });
  }
}
module.exports = chatSockets;