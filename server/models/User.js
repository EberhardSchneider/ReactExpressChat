const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: String,
  name: String,
  password: String
});
userSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  console.log('setting new password');

  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

userSchema.methods.isValidPassword = function(pwd) {
  return bcrypt.compareSync(pwd, this.password);
};


const User = mongoose.model('User', userSchema, 'users');

module.exports = User;