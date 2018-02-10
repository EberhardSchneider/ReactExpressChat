var express = require('express');
var authRouter = express.Router();

authRouter.post('/signIn', function(req, res) {
  res.send('<h1>Sign In</h1>');
});

authRouter.post('/signUp', function(req, res) {
  res.send('<h1>Sign Up</h1>');
});

module.exports = authRouter;