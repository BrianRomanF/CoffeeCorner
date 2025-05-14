const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');

const Coffee = require('./models/coffeeModel');
const User = require('./models/userModel');
const Review = require('./models/reviewModel');

dotenv.config();
connectDB();

const seedDB = async () => {
  try {
    // Limpiar la base de datos
    await Coffee.deleteMany({});
    await User.deleteMany({});
    await Review.deleteMany({});

    // Crear usuarios
    const user1 = new User({ email: 'alice@example.com', username: 'alice' });
    const user2 = new User({ email: 'bob@example.com', username: 'bob' });
    await user1.save();
    await user2.save();

    // Crear reviews
    const review1 = new Review({
      body: '¡Delicioso café con notas de chocolate!',
      rating: 5,
      author: user2._id
    });

    const review2 = new Review({
      body: 'No tan fuerte como esperaba, pero sabroso.',
      rating: 4,
      author: user1._id
    });

    await review1.save();
    await review2.save();

    // Crear cafés
    const coffee1 = new Coffee({
      title: 'Café Volcánico',
      images: 'https://example.com/volcanico.jpg',
      description: 'Café tostado oscuro, fuerte y aromático.',
      location: 'Chile',
      author: user1._id,
      reviews: [review1._id, review2._id]
    });

    const coffee2 = new Coffee({
      title: 'Andes Blend',
      images: 'https://example.com/andes.jpg',
      description: 'Mezcla suave de granos andinos.',
      location: 'Perú',
      author: user2._id,
      reviews: []
    });



    
    await coffee1.save();
    await coffee2.save();

    

    console.log('✅ Base de datos poblada con datos iniciales');
    process.exit();
  } catch (error) {
    console.error('❌ Error al hacer seed:', error);
    process.exit(1);
  }
};




seedDB();


