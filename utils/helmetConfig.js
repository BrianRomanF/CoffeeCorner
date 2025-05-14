const helmet = require('helmet');

const helmetConfig = helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: [],
    connectSrc: ["'self'", "https://api.cloudinary.com"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    workerSrc: ["'self'", "blob:"],
    objectSrc: [],
    imgSrc: [
      "'self'",
      "blob:",
      "data:",
      "https://res.cloudinary.com", // Cloudinary base
    ],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
  },
});

module.exports = helmetConfig;