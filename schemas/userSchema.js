const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.empty': 'El nombre de usuario es obligatorio',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no debe tener más de 30 caracteres'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Debes ingresar un email válido',
    'string.empty': 'El email es obligatorio'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'La contraseña es obligatoria',
    'string.min': 'La contraseña debe tener al menos 6 caracteres'
  })
});

const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    'string.empty': 'El nombre de usuario es obligatorio'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es obligatoria'
  })
});

module.exports = { registerSchema, loginSchema };
