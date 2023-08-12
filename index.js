const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
const port = 3001; // Choose a port number for your server

app.use(express.json());
app.use(cors())

// Define a route to handle the proxy request
app.get('/directions', async (req, res) => {
  const { origin = { lat: 37.7749, lng: -122.4194 , color:'red'}, destination = { lat: 37.7858, lng: -122.4064, color:'red' }, key="AIzaSyDrvGQJA9kcNfCgDGO0UFaXyUU39U29SPU" } = req.query;
  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${key}`;
  try {
    const response = await axios.get(apiUrl);
    const data = response.data
    res.json(data);
  } catch (error) {
    console.error('Routing request failed:', error);
    res.status(500).json({ error: 'Routing request failed' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});