const express = require('express');
const passport = require('passport');
const {
  registerUser,
  loginUser,
  logoutUser
} = require('../controllers/userControllers');
const { validateRegister, validateLogin } = require('../middleware/validateUser');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')



router.post('/register', validateRegister, catchAsync(registerUser));
router.post('/login', validateLogin, loginUser);
router.post('/logout', catchAsync(logoutUser));

module.exports = router;
