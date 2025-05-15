const User = require('../models/userModel');
const passport = require('passport');

// Registro de usuario
const registerUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      res.status(201).json({ message: 'Usuario registrado y autenticado', user: registeredUser });
    });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Error al registrar usuario' });
  }
};

// Login
const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: 'Usuario autenticado', user });
    });
  })(req, res, next);
};

// Logout
const logoutUser = (req, res) => {
  req.logout(() => {
    res.status(200).json({ message: 'Sesión cerrada correctamente' });
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};