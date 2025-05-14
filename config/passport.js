const passport = require('passport');
const User = require('../models/userModel')

 const passportConfig = () => {
  passport.use(User.createStrategy());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};


module.exports = passportConfig; 