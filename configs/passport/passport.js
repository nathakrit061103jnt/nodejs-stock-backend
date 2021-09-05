const passport = require("passport");

// const db = require("../models");
// const User = db.users;

module.exports = (user) => {
  const User = user;

  // load jwt strategy
  require("../strategies/jwt")();

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });
};
