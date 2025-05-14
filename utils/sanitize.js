const mongoSanitize = require('mongo-sanitize');

// Este middleware limpia req.body, req.query y req.params
const sanitizeMiddleware = (req, res, next) => {
  req.body = sanitizeObject(req.body);
  req.query = sanitizeObject(req.query);
  req.params = sanitizeObject(req.params);
  next();
};

function sanitizeObject(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;

  const sanitized = {};
  for (const key in obj) {
    sanitized[key] = mongoSanitize(obj[key]);
  }
  return sanitized;
}

module.exports = sanitizeMiddleware;
