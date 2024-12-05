const { getServiceInfo } = require('./handlers/messageHandler');
const connectDB = require('./db');
require('dotenv').config();

async function runTests() {
  await connectDB();

  // Teste de busca de serviço válido em Osório
  let city = 'osorio';
  let type = 'hospital';
  let response = await getServiceInfo(city, type);
  console.log('Teste de busca de serviço válido em Osório:', response.includes('Hospital São Vicente de Paulo'));
  console.log('Resposta:', response);

  // Teste de busca de serviço válido em Tramandaí
  city = 'tramandai';
  response = await getServiceInfo(city, type);
  console.log('Teste de busca de serviço válido em Tramandaí:', response.includes('Hospital Tramandaí'));
  console.log('Resposta:', response);

  // Teste de busca de serviço inválido
  type = 'invalid';
  response = await getServiceInfo(city, type);
  console.log('Teste de busca de serviço inválido:', response === 'Serviço não encontrado.');
  console.log('Resposta:', response);
}

runTests();