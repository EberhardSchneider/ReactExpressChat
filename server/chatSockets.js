const guid = require('guid');

let loggedInUsers = {};


// web socket handling

function chatSockets(server, Room, Message) {

  var io = require('socket.io')(server);

  io.on('connection', (socket) => {
    console.log('Connection started...');
    socket.roomId = '';

    socket.on('add user', (data) => {
      loggedInUsers[socket.id] = data;
      socket.emit('user added', loggedInUsers);
      triggerUserUpdate(socket);
    });

    socket.on('add room', (data) => {
      console.log('Adding room.');
      const newRoom = new Room(data);
      newRoom.save((err) => {
        triggerRoomUpdate(socket);
      });

    });

    socket.on('new message', (data) => {
      const message = new Message({
        _id: guid.raw(),
        userId: socket.id,
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
      // users[socket.id].roomId = data.key;
      // roomId = data.key;
      // store roomId in socket
      // socket.roomId = data.key;
      // User.findOneAndUpdate({
      //   _id: socket.id
      // }, {
      //   roomId: data.key
      // }, (err, ) => {
      //   if (err) {
      //     console.error('Could not update user for new room.');
      //     console.error(err);
      //   }
      //   triggerUserUpdate(socket);
      // });
      loggedInUsers[socket.id].roomId = data.key;
      socket.roomId = data.key;
      triggerUserUpdate(socket);

    });

    socket.on('disconnecting', () => {
      delete loggedInUsers[socket.id];
      triggerUserUpdate(socket);
    });
  });


  function triggerUserUpdate(socket) {
    console.log('Update:');
    socket.broadcast.emit('users updated', loggedInUsers);
  }

  function triggerRoomUpdate(socket) {
    Room.find((err, doc) => {
      socket.broadcast.emit('rooms updated', {
        rooms: doc
      });
    });
  }
}
module.exports = chatSockets;