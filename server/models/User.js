const mongoose = require('mongoose');


const userSchema = {
  id: String,
  name: String,
  roomId: String
};
const User = mongoose.model('User', userSchema, 'users');

module.exports = User;