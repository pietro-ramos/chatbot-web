const mongoose = require('mongoose');
const Service = require('../models/Service');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  const services = [
    // Osório
    {
      city: 'osorio',
      type: 'hospital',
      name: 'Hospital São Vicente de Paulo',
      address: 'R. Marechal Floriano, 488',
      hours: '24 horas',
      contact: '(51) 3663-4000'
    },
    // Tramandaí
    {
      city: 'tramandai',
      type: 'hospital',
      name: 'Hospital Tramandaí',
      address: 'Av. Emancipação, 1255',
      hours: '24 horas',
      contact: '(51) 3684-0300'
    },
    // Santo Antônio da Patrulha
    {
      city: 'santo_antonio',
      type: 'hospital',
      name: 'Hospital Santo Antônio',
      address: 'R. Cel. Victor Villa Verde, 100',
      hours: '24 horas',
      contact: '(51) 3662-1800'
    },
    // Capão da Canoa
    {
      city: 'capao',
      type: 'hospital',
      name: 'Hospital Santa Luzia',
      address: 'Av. Rudá, 800',
      hours: '24 horas',
      contact: '(51) 3625-1221'
    }
  ];

  try {
    await Service.insertMany(services);
    console.log('Dados inseridos com sucesso');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();