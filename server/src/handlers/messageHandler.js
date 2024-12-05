const Service = require('../models/Service');

// Função para buscar informações do serviço no banco de dados
async function getServiceInfo(city, type) {
  console.log(`Database query for service in city: ${city}, type: ${type}`);
  const service = await Service.findOne({ city, type });
  if (service) {
    console.log('Service found in database');
    return `Serviço: ${service.name}\nEndereço: ${service.address}\nHorário: ${service.hours}\nContato: ${service.contact}`;
  }
  console.log('Service not found');
  return 'Serviço não encontrado.';
}

module.exports = { getServiceInfo };