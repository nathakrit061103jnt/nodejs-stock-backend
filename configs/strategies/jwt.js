const passport = require("passport");
const passportJWT = require("passport-jwt");

const db = require("../../models");
const User = db.users;

require("dotenv").config();
const secretOrKey = process.env.SECRETORKEY;

const getUser = async (obj) => {
  return await User.findOne({
    where: obj,
  });
};

module.exports = () => {
  let ExtractJwt = passportJWT.ExtractJwt;
  let JwtStrategy = passportJWT.Strategy;

  let jwtOptions = {};
  jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  jwtOptions.secretOrKey = secretOrKey;

  // lets create our strategy for web token
  let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
    console.log("payload received", jwt_payload);
    let user = getUser({ id: jwt_payload.id });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);
};
