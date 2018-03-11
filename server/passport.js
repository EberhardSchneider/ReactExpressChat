module.exports = function(User) {
  let passport = require('passport');
  let LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy((username, password, done) => {
    console.log('Entering local strategy');
    User.findOne({
      name: username
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.isValidPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  return passport;
};