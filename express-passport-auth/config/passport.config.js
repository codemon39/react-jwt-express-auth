const mongoose = require('mongoose');

const jwtStrategy = require('passport-jwt').Strategy;
const extractJwt = require('passport-jwt').ExtractJwt;

const keys = require('../config/keys.config');

const User = require('../models/user.model');

const secret = {};
secret.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
secret.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new jwtStrategy(secret, (jwt_payload, done) => {
      User.findById(jwt_payload.id).then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      }).catch(err => console.log(err)); 
    }));
};
