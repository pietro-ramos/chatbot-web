const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  city: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  hours: { type: String, required: true },
  contact: { type: String, required: true },
});

module.exports = mongoose.model('Service', ServiceSchema);