const express = require('express');
const { getServiceInfo } = require('./handlers/messageHandler');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(express.json());

connectDB();

app.get('/api/service/:city/:type', async (req, res) => {
  const { city, type } = req.params;
  try {
    const response = await getServiceInfo(city, type);
    res.json({ response });
  } catch (error) {
    console.error('Error fetching service info:', error);
    res.status(500).json({ error: 'Erro ao buscar informações do serviço.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));