//const ExpressError = require('./utils/ExpressError');
const Coffee = require('../models/coffeeModel');
const Review = require('../models/reviewModel');


//middleware necesita el next 
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
        return res.status(401).json({ message: 'Debes estar logueado para realizar esta acción.' });
    }
    next();
};

// Verifica si el usuario es autor del café
module.exports.isCoffeeAuthor = async (req, res, next) => {
    const { id } = req.params;
    const coffee = await Coffee.findById(id);
    if (!coffee) return res.status(404).json({ message: 'Café no encontrado' });
  
    if (!coffee.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'No tienes permiso para modificar este café' });
    }
    next();
  };
  
  // Verifica si el usuario es autor del review
  module.exports.isReviewAuthor = async (req, res, next) => {
    const { id } = req.params; // el ID del review
    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review no encontrado' });
  
    if (!review.author.equals(req.user._id)) {
      return res.status(403).json({ message: 'No tienes permiso para modificar este review' });
    }
    next();
  };



module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}