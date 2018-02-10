var express = require('express');
var authRouter = express.Router();

authRouter.post('/login', function(req, res) {
  res.send('<h1>Sign In</h1>');
});

authRouter.post('/register', function(req, res) {
  const {
    username,
    password,
    passwordVerify
  } = req.body;

  if (username === '' || password !== passwordVerify) {
    req.session.message = 'Please enter valid username and passwords';
    res.redirect('/login');
  }

});

module.exports = authRouter;