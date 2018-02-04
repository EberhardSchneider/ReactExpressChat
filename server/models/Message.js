const mongoose = require('mongoose');


const messageSchema = mongoose.Schema({
  _id: String,
  userId: String,
  roomId: String,
  body: String,
  date: Date
});

const Message = mongoose.model('Message', messageSchema, 'messages');

module.exports = Message;