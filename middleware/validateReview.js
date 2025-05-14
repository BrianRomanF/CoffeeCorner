const { reviewSchema } = require('../schemas/reviewSchema');

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const message = error.details.map(el => el.message).join(', ');
    return res.status(400).json({ message });
  }
  next();
};

module.exports = validateReview;
