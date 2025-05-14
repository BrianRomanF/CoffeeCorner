const mongoose = require('mongoose'); 

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

 const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
    process.exit(1); // Salir del proceso si falla la conexión
  }
};

module.exports = connectDB; 