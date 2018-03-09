const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
  _id: String,
  chatname: String,
  bio: String,
  imageUrl: String,
  color: String,
  roomId: String
});

const UserDetail = mongoose.model('UserDetail', userDetailSchema, 'userDetails');

module.exports = UserDetail;

// renamed