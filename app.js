
const express = require('express');
const app = express();
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const path = require('path');
const PORT = 3000;
const connectDB = require('./db');
const passportConfig = require('./config/passport')
const userRoutes = require('./routes/userRoutes');
const coffeeRoutes = require('./routes/coffeeRoutes');
const User = require('./models/userModel');
const reviewRoutes = require('./routes/reviewRoutes');
const ExpressError = require('./utils/ExpressError')
const sanitizeMiddleware = require('./utils/sanitize');
const helmet = require('helmet');
const helmetConfig = require('./utils/helmetConfig');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(sanitizeMiddleware);
app.use(helmet());
app.use(helmetConfig);


connectDB();
passportConfig();

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // <- ¡Esto es esencial en Render!
}
const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    name: '_usT',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(passport.initialize());
app.use(passport.session());  

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 requests por ventana
  message: 'Demasiadas peticiones desde esta IP. Inténtalo más tarde.'
});

app.use(limiter);


app.use('/api/user', userRoutes);
app.use('/api/coffees', coffeeRoutes); 
app.use('/api/reviews', reviewRoutes);

app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})




app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`)
});

