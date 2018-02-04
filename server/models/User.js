const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  _id: String,
  name: String,
  roomId: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;