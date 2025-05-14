const express = require('express');
const router = express.Router();
const {
  createReview,
  updateReview,
  deleteReview,
  getReview,
  getAllReviews
} = require('../controllers/reviewControllers');
const { isLoggedIn, isReviewAuthor } = require('../middleware/middleware');
const validateReview = require('../middleware/validateReview');
const catchAsync = require('../utils/catchAsync')


router.route('/').get(catchAsync(getAllReviews))

router.route('/:id')
  .get(catchAsync(getReview))
  .post(isLoggedIn, validateReview, catchAsync(createReview))
  .put(isLoggedIn, isReviewAuthor, validateReview, catchAsync(updateReview))
  .delete(isLoggedIn, isReviewAuthor, catchAsync(deleteReview))

// Crear review
//router.post('/:id',isLoggedIn,validateReview, createReview );

// Obtener todos
//router.get('/', getAllReviews);

// Obtener uno
//router.get('/:id', getReview);

// Editar (solo autor)
//router.put('/:id', isLoggedIn, isReviewAuthor,validateReview, updateReview);

// Eliminar (solo autor)
//router.delete('/:id', isLoggedIn, isReviewAuthor, deleteReview);

module.exports = router;
