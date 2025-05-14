const { registerSchema, loginSchema } = require('../schemas/userSchema');

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const message = error.details.map(e => e.message).join(', ');
    return res.status(400).json({ message });
  }
  next();
};

const validateLogin = (req, res, next) => {

  const { error } = loginSchema.validate(req.body);
  if (error) {
    const message = error.details.map(e => e.message).join(', ');
    return res.status(400).json({ message });
  }
  next();
};

module.exports = { validateRegister, validateLogin };
