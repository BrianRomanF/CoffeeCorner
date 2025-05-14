const { coffeeSchema } = require('../schemas/coffeeSchema');

const validateCoffee = (req, res, next) => {
  const { error } = coffeeSchema.validate(req.body);

  if (error) {
    const message = error.details.map(el => el.message).join(', ');
    return res.status(400).json({ message });
  }
  next();
};

module.exports = validateCoffee;