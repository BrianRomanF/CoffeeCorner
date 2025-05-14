const Joi = require('joi');

const coffeeSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'El título es obligatorio',
    'any.required': 'Debes ingresar un título'
  }),
  /* images: Joi.string().uri().required().messages({
    'string.empty': 'La URL de la imagen es obligatoria',
    'string.uri': 'Debe ser una URL válida'
  }), */
  description: Joi.string().required().messages({
    'string.empty': 'La descripción es obligatoria'
  }),
  location: Joi.string().required().messages({
    'string.empty': 'La ubicación es obligatoria'
  })
});

module.exports = { coffeeSchema };