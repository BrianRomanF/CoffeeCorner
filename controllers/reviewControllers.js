const Review = require('../models/reviewModel');
const Coffee = require('../models/coffeeModel');

module.exports = {
  createReview: async (req, res) => {
    try {
      const { id } = req.params;
      const { body, rating } = req.body;

      const coffee = await Coffee.findById(id);
      if (!coffee) return res.status(404).json({ message: 'Café no encontrado' });

      const review = new Review({
        body,
        rating,
        author: req.user._id
      });

      await review.save();

      coffee.reviews.push(review._id);
      await coffee.save();

      res.status(201).json({ message: 'Review creado', review });
    } catch (err) {
      res.status(500).json({ message: 'Error al crear review', error: err.message });
    }
  },

  getAllReviews: async (req, res) => {
    try {
      const reviews = await Review.find().populate('author');
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener reviews', error: err.message });
    }
  },

  getReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id).populate('author');
      if (!review) return res.status(404).json({ message: 'Review no encontrado' });
      res.json(review);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener review', error: err.message });
    }
  },

  updateReview: async (req, res) => {
    try {
      const { body, rating } = req.body;
      const review = await Review.findById(req.params.id);

      if (!review) return res.status(404).json({ message: 'Review no encontrado' });

      // Opcional: verificar si req.user._id === review.author

      review.body = body || review.body;
      review.rating = rating || review.rating;
      await review.save();

      res.json({ message: 'Review actualizado', review });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar review', error: err.message });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) return res.status(404).json({ message: 'Review no encontrado' });

      // Opcional: verificar si req.user._id === review.author

      await Review.findByIdAndDelete(req.params.id);

      // También eliminar la referencia del café
      await Coffee.updateMany(
        { reviews: req.params.id },
        { $pull: { reviews: req.params.id } }
      );

      res.json({ message: 'Review eliminado' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar review', error: err.message });
    }
  }
};
