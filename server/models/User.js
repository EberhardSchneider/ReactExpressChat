const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: String,
  name: String,
  password: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;