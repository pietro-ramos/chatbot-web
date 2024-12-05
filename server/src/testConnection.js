const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    process.exit(0);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();