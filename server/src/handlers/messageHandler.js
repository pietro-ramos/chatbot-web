const Service = require('../models/Service');

async function getServiceInfo(city, type) {
  console.log(`Database query for services in city: ${city}, type: ${type}`);
  const services = await Service.find({ city, type });
  
  if (services && services.length > 0) {
    console.log(`Found ${services.length} services`);
    return services.map(service => 
      `Serviço: ${service.name}\nEndereço: ${service.address}\nHorário: ${service.hours}\nContato: ${service.contact}`
    ).join('\n\n');
  }
  
  console.log('No services found');
  return 'Nenhum serviço encontrado para esta categoria.';
}

module.exports = { getServiceInfo };