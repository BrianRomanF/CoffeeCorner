const Coffee = require('../models/coffeeModel');
const Review = require('../models/reviewModel');
const { cloudinary } = require('../cloudinary');


// Obtener cafés del usuario autenticado
/* const getMyCoffees = async (req, res) => {
  const coffees = await Coffee.find({ author: req.user._id });
  res.json(coffees);
};
 */
// Crear nuevo café
const createMyCoffee = async (req, res) => {
  const { title, description, location } = req.body;

  const newCoffee = new Coffee({
    title,
    description,
    location,
    author: req.user._id
  });

  if (req.file) {
    newCoffee.images = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await newCoffee.save();
  res.status(201).json(newCoffee);
};


const getMyCoffees = async (req, res) => {
  try {
    const userId = req.user._id;
    const coffees = await Coffee.find({ author: userId }).populate('reviews');
    res.json(coffees);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener tus cafés', error: err.message });
  }
};


const getCoffees = async (req, res) => {
  try {
    const { id } = req.params;
    const coffee = await Coffee.findById(id).populate({
      path: 'reviews',
      populate: {
        path: 'author'
      }
    }).populate('author');

    if (!coffee) {
      return res.status(404).json({ message: 'Café no encontrado' });
    }

    res.status(200).json({ coffee });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener café', error: error.message });
  }
};


// Actualizar café del usuario
const updateMyCoffee = async (req, res) => {
  const coffee = await Coffee.findById(req.params.id);

  if (!coffee) return res.status(404).json({ message: 'Café no encontrado' });
  if (!coffee.author.equals(req.user._id)) return res.status(403).json({ message: 'No autorizado' });

  const { title, images, description, location } = req.body;

  // Reemplazar imagen si se subió una nueva
  if (req.file) {
    // Eliminar imagen anterior
    if (coffee.images && coffee.images[0].filename) {
      await cloudinary.uploader.destroy(coffee.images[0].filename);
    }

    // Guardar nueva imagen
    coffee.images = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  coffee.title = title || coffee.title;
  coffee.images = images || coffee.images;
  coffee.description = description || coffee.description;
  coffee.location = location || coffee.location;

  await coffee.save();
  res.json(coffee);
};

// Eliminar café del usuario
const deleteMyCoffee = async (req, res) => {
  const { id } = req.params
  const coffee = await Coffee.findById(id);

  if (!coffee) return res.status(404).json({ message: 'Café no encontrado' });
  if (!coffee.author.equals(req.user._id)) return res.status(403).json({ message: 'No autorizado' });

  if (coffee.images && coffee.images[0].filename) {

    await cloudinary.uploader.destroy(coffee.images[0].filename);

  }
  await Coffee.findByIdAndDelete(id);
  res.json({ message: 'Café eliminado' });

};

module.exports = {
  getMyCoffees,
  getCoffees,
  createMyCoffee,
  updateMyCoffee,
  deleteMyCoffee,
};
