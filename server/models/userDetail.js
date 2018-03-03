import mongoose from 'mongoose';

const userDetailSchema = new mongoose.Schema({
  _id: String,
  chatname: String,
  bio: String,
  imageUrl: String,
  color: String
});

export default userDetailSchema;