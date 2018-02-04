const guid = require('guid');


// web socket handling

function chatSockets(server, User, Room) {

  let roomId = undefined;


  var io = require('socket.io')(server);


  io.on('connection', (socket) => {
    console.log('Connection started...');

    socket.on('add user', (data) => {
      const newUser = new User({
        _id: socket.id,
        name: data.name,
        roomId: ''
      });
      newUser.save();

      triggerUserUpdate(socket);
    });

    socket.on('add room', (data) => {
      console.log('Adding room.');
      const newRoom = new Room({
        _id: guid.raw(),
        name: data.name
      });
      newRoom.save((err) => {});
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
      // users[socket.id].roomId = data.key;
      // roomId = data.key;
      console.log('joining room with key: ' + data.key);
      User.findOneAndUpdate({
        _id: socket.id
      }, {
        roomId: data.key
      }, (err, item) => {
        if (err) {
          console.error('Could not update user for new room.');
          console.error(err);
        }
      });
      triggerUserUpdate(socket);
    });

    socket.on('disconnecting', () => {
      User.remove({
        _id: socket.id
      });
      triggerUserUpdate(socket);
    });
  });


  function triggerUserUpdate(socket) {
    console.log('Update:');
    User.find((err, doc) => {
      console.log(doc);
      socket.broadcast.emit('users updated', {
        users: doc
      });
      socket.emit('users updated', {
        users: doc
      });
    });
  }

  function triggerRoomUpdate(socket) {
    Room.find((err, doc) => {
      socket.broadcast.emit('rooms updated', {
        rooms: doc
      });
      socket.emit('rooms updated', {
        rooms: doc
      });
    });
  }
}
module.exports = chatSockets;