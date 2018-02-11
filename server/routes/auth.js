var express = require('express');
const guid = require('guid');
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
      const newUser = new User({
        _id: guid.raw(),
        name: username,
        password: password
      });
      newUser.save(err => {
        console.log(err);
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
      } else if (user.password !== password) {
        req.session.message = 'Wrong password.';
        res.redirect('/login');
      } else {
        req.session.user = user._id;
        res.redirect('/');
      }
    });
  });

  return authRouter;
};