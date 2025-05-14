const Joi = require('joi');

const reviewSchema = Joi.object({
  body: Joi.string().required().messages({
    'string.empty': 'El comentario es obligatorio'
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    'number.base': 'El rating debe ser un número',
    'number.min': 'El rating debe ser al menos 1',
    'number.max': 'El rating no puede ser mayor que 5',
    'any.required': 'El rating es obligatorio'
  })
});

module.exports = { reviewSchema };
