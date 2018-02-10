export default function(User) { // mongoose User model
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy((username, password, done) => {
    // check user and password in database

  }));
}