const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  _id: String,
  name: String,
  admin_userId: String // admin user id 
});

const Room = mongoose.model('Room', roomSchema, 'rooms');

module.exports = Room;