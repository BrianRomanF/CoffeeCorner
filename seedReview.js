const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');

const Coffee = require('./models/coffeeModel');
const User = require('./models/userModel');
const Review = require('./models/reviewModel');

dotenv.config();
connectDB();

async function seed() {
  try {
  
 /*    // Asegúrate de tener un usuario en la base de datos
    const user = await User.findOne({ username: 'alice' }); // Cambia a un usuario real si es necesario

    if (!user || !coffee) {
      console.log('Usuario o café no encontrado');
      return;
    }
 */

    // Asegúrate de tener un café para asociar
    const coffee = await Coffee.findOne({ _id: '67f0670b9c966d77dafbbc19' });

    // Crear un nuevo review
    const review = new Review({
      body: 'Este café es excelente, tiene un sabor muy suave y delicioso.',
      rating: 5,
      author: '67f0670b9c966d77dafbbc19'
    });

    // Guardar el review
    await review.save();

    // Asociar el review al café
    coffee.reviews.push(review._id);
    await coffee.save();

    console.log('Review agregado exitosamente');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();
