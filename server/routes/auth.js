var express = require('express');
const guid = require('guid');

var authRouter = express.Router();


module.exports = function(User, UserDetail) {

  authRouter.post('/register', (req, res) => {
    console.log('Registering User!');
    const {
      username,
      password,
      passwordVerify
    } = req.body;

    // TODO: check password length and characters
    if (username === '' || password !== passwordVerify) {
      req.session.message = 'Please enter valid username and passwords';
      res.redirect('/login');
    } else {
      console.log('Store new user');
      const newUser = new User({
        _id: guid.raw(),
        name: username,
        password: password
      });
      newUser.save(err => {
        console.log(err);
      });

      const newUserDetail = new UserDetail({
        _id: newUser._id,
        chatname: username,
        roomId: '',
        bio: '',
        imageUrl: 'default.jpg',
        color: 'black'
      });
      newUserDetail.save(err => {
        console.log(err);
      });

      req.session.message = 'New user ' + username + ' registered succesfully.';
      res.redirect('/login');

    }
  });

  // authRouter.post('/login', (req, res) => {
  //
  //   const {
  //     username,
  //     password
  //   } = req.body;
  //
  //   if (req.session.user) {
  //     req.session.message = 'User already logged in.';
  //     res.redirect('/login');
  //   }
  //
  //   User.findOne({
  //     name: username
  //   }, (err, user) => {
  //
  //     if (!user || !user.password) {
  //       req.session.message = 'Unknown user.';
  //       res.redirect('/login');
  //     } else {
  //       // bcrypt.compare(password, user.password, (err, result) => {
  //       //   if (result) {
  //       //     req.session.user = user._id;
  //       //     res.redirect('/');
  //       //   } else {
  //       //     req.session.message = 'Wrong password.';
  //       //     res.redirect('/login');
  //       //   }
  //       // });
  //       if (user.isValidPassword(password)) {
  //         // req.session.user = user._id;
  //         res.redirect('/');
  //       } else {
  //         req.session.message = 'Wrong password.';
  //         res.redirect('/login');
  //       }
  //     }
  //   });
  // });


  authRouter.get('/logout', (req, res) => {
    req.flash('message', 'Successfully logged out.');
    req.logout();
    res.redirect('/');
  });

  return authRouter;
};