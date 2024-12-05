const mongoose = require('mongoose');
require('dotenv').config(); // Carregar as variáveis de ambiente do arquivo .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;