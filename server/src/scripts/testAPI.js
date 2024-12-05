const axios = require('axios');

// Test configuration
const BASE_URL = 'http://localhost:5000';
const cities = ['osorio', 'tramandai', 'santo_antonio', 'capao'];
const serviceTypes = ['saude', 'seguranca', 'justica', 'orgaos_publicos'];

async function testApiEndpoints() {
  console.log('Starting API tests...\n');

  try {
    // Test each city and service type combination
    for (const city of cities) {
      console.log(`\nTesting city: ${city}`);
      console.log('------------------------');
      
      for (const type of serviceTypes) {
        try {
          console.log(`\nTesting service type: ${type}`);
          const response = await axios.get(`${BASE_URL}/api/service/${city}/${type}`);
          console.log('Status:', response.status);
          console.log('Response:', response.data);
        } catch (error) {
          console.error(`Error testing ${city}/${type}:`, 
            error.response ? error.response.data : error.message
          );
        }
        console.log('------------------------');
      }
    }

  } catch (error) {
    console.error('Test execution failed:', error.message);
  }
}

// Run the tests
console.log('API Test Suite');
console.log('==============\n');
testApiEndpoints();