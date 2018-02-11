var express = require('express');
const guid = require('guid');
var bcrypt = require('bcrypt');

var authRouter = express.Router();


module.exports = function(User) {

  authRouter.post('/register', (req, res) => {
    const {
      username,
      password,
      passwordVerify
    } = req.body;

    if (username === '' || password !== passwordVerify) {
      req.session.message = 'Please enter valid username and passwords';
      res.redirect('/login');
    } else {
      // hash password
      bcrypt.hash(password, 10, (err, hash) => {
        if (!err) {
          const newUser = new User({
            _id: guid.raw(),
            name: username,
            password: hash
          });
          newUser.save(err => {
            console.log(err);
          });
        }
      });

    }
  });

  authRouter.post('/login', (req, res) => {
    const {
      username,
      password
    } = req.body;

    User.findOne({
      name: username
    }, (err, user) => {

      if (!user) {
        req.session.message = 'Unknown user.';
        res.redirect('/login');
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          req.session.user = user._id;
          res.redirect('/');
        } else {
          req.session.message = 'Wrong password.';
          res.redirect('/login');
        }
      });
    });
  });

  return authRouter;
};