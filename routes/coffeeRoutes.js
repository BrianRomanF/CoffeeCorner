const express = require('express');
const router = express.Router();
const validateCoffee = require('../middleware/validateCoffee');
const upload = require('../middleware/upload');
const catchAsync = require('../utils/catchAsync');

const {
  getCoffees,
  getMyCoffees,
  createMyCoffee,
  updateMyCoffee,
  deleteMyCoffee
} = require('../controllers/coffeeControllers');

const { isLoggedIn, isCoffeeAuthor } = require('../middleware/middleware');

router.use(isLoggedIn); 

router.route('/').post(upload.single('image'), validateCoffee, catchAsync(createMyCoffee));
router.route('/mycoffees').get(catchAsync(getMyCoffees));

router.route('/:id')
      .get(catchAsync(getCoffees))
      .put(isCoffeeAuthor, upload.single('image'), validateCoffee, catchAsync( updateMyCoffee))
      .delete(isCoffeeAuthor, catchAsync(deleteMyCoffee))




module.exports = router;