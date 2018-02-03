const guid = require('guid');


// web socket handling

function chatSockets(server, users, rooms) {

  let roomId = undefined;


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

}

module.exports = chatSockets;