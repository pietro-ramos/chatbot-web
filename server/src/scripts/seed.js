const mongoose = require('mongoose');
const Service = require('../models/Service');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

const seedData = async () => {
  await connectDB();

  const services = [
    // OSÓRIO
    {
      city: 'osorio',
      type: 'saude',
      name: 'Hospital São Vicente de Paulo',
      address: 'R. Marechal Floriano, 488',
      hours: '24 horas',
      contact: '(51) 3663-4000'
    },
    {
      city: 'osorio',
      type: 'saude',
      name: 'Secretaria Municipal de Saúde',
      address: 'Av. Jorge Dariva, 1251',
      hours: 'Segunda a sexta: 8h às 17h',
      contact: '(51) 3663-8484'
    },
    {
      city: 'osorio',
      type: 'seguranca',
      name: '1ª Delegacia de Polícia Civil',
      address: 'R. Marechal Floriano, 1090',
      hours: '24 horas',
      contact: '(51) 3663-1033'
    },
    {
      city: 'osorio',
      type: 'seguranca',
      name: '2º Batalhão de Policiamento Militar',
      address: 'R. General Osório, 2040',
      hours: '24 horas',
      contact: '(51) 3663-1055'
    },
    {
      city: 'osorio',
      type: 'justica',
      name: 'Fórum de Osório',
      address: 'R. Marechal Floriano, 1122',
      hours: 'Segunda a sexta: 9h às 18h',
      contact: '(51) 3663-3100'
    },
    {
      city: 'osorio',
      type: 'justica',
      name: 'Defensoria Pública',
      address: 'R. Marechal Floriano, 1165',
      hours: 'Segunda a sexta: 8h às 17h',
      contact: '(51) 3663-4173'
    },
    {
      city: 'osorio',
      type: 'orgaos_publicos',
      name: 'Prefeitura Municipal',
      address: 'Av. Jorge Dariva, 1251',
      hours: 'Segunda a sexta: 8h às 14h',
      contact: '(51) 3663-8200'
    },

    // TRAMANDAÍ
    {
      city: 'tramandai',
      type: 'saude',
      name: 'Hospital Tramandaí',
      address: 'Av. Emancipação, 1255',
      hours: '24 horas',
      contact: '(51) 3684-0300'
    },
    {
      city: 'tramandai',
      type: 'saude',
      name: 'Secretaria Municipal de Saúde',
      address: 'Av. da Igreja, 346',
      hours: 'Segunda a sexta: 8h às 17h',
      contact: '(51) 3684-9017'
    },
    {
      city: 'tramandai',
      type: 'seguranca',
      name: 'Delegacia de Polícia',
      address: 'Av. Fernandes Bastos, 1111',
      hours: '24 horas',
      contact: '(51) 3684-1144'
    },
    {
      city: 'tramandai',
      type: 'seguranca',
      name: 'Brigada Militar',
      address: 'R. Vergueiros, 1876',
      hours: '24 horas',
      contact: '(51) 3684-2035'
    },
    {
      city: 'tramandai',
      type: 'justica',
      name: 'Fórum de Tramandaí',
      address: 'Av. da Igreja, 195',
      hours: 'Segunda a sexta: 9h às 18h',
      contact: '(51) 3684-7900'
    },
    {
      city: 'tramandai',
      type: 'orgaos_publicos',
      name: 'Prefeitura Municipal',
      address: 'Av. da Igreja, 346',
      hours: 'Segunda a sexta: 8h às 14h',
      contact: '(51) 3684-9000'
    },

    // SANTO ANTÔNIO DA PATRULHA
    {
      city: 'santo_antonio',
      type: 'saude',
      name: 'Hospital Santo Antônio',
      address: 'R. Cel. Victor Villa Verde, 100',
      hours: '24 horas',
      contact: '(51) 3662-1800'
    },
    {
      city: 'santo_antonio',
      type: 'saude',
      name: 'Secretaria Municipal de Saúde',
      address: 'R. Cel. Victor Villa Verde, 207',
      hours: 'Segunda a sexta: 8h às 17h',
      contact: '(51) 3662-8416'
    },
    {
      city: 'santo_antonio',
      type: 'seguranca',
      name: 'Delegacia de Polícia',
      address: 'R. Coronel Pacheco, 166',
      hours: '24 horas',
      contact: '(51) 3662-3200'
    },
    {
      city: 'santo_antonio',
      type: 'justica',
      name: 'Fórum de Santo Antônio',
      address: 'R. Cel. Victor Villa Verde, 126',
      hours: 'Segunda a sexta: 9h às 18h',
      contact: '(51) 3662-4477'
    },
    {
      city: 'santo_antonio',
      type: 'orgaos_publicos',
      name: 'Prefeitura Municipal',
      address: 'Av. Borges de Medeiros, 456',
      hours: 'Segunda a sexta: 8h às 14h',
      contact: '(51) 3662-8400'
    },

    // CAPÃO DA CANOA
    {
      city: 'capao',
      type: 'saude',
      name: 'Hospital Santa Luzia',
      address: 'Av. Rudá, 800',
      hours: '24 horas',
      contact: '(51) 3625-1221'
    },
    {
      city: 'capao',
      type: 'saude',
      name: 'Secretaria Municipal de Saúde',
      address: 'Av. Paraguassú, 1881',
      hours: 'Segunda a sexta: 8h às 17h',
      contact: '(51) 3625-2112'
    },
    {
      city: 'capao',
      type: 'seguranca',
      name: 'Delegacia de Polícia Civil',
      address: 'Av. Paraguassú, 1945',
      hours: '24 horas',
      contact: '(51) 3625-1144'
    },
    {
      city: 'capao',
      type: 'seguranca',
      name: 'Brigada Militar',
      address: 'R. Padre Réus, 235',
      hours: '24 horas',
      contact: '(51) 3625-1788'
    },
    {
      city: 'capao',
      type: 'justica',
      name: 'Fórum de Capão da Canoa',
      address: 'Av. Rudá, 771',
      hours: 'Segunda a sexta: 9h às 18h',
      contact: '(51) 3625-1144'
    },
    {
      city: 'capao',
      type: 'orgaos_publicos',
      name: 'Prefeitura Municipal',
      address: 'Av. Paraguassú, 1881',
      hours: 'Segunda a sexta: 8h às 14h',
      contact: '(51) 3995-1100'
    }
  ];

  try {
    await Service.deleteMany({}); // Limpar dados existentes
    await Service.insertMany(services);
    console.log('Dados inseridos com sucesso');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();