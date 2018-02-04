const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  _id: String,
  name: String
});

const Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = Room;