const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'test.html'));
});

app.get('/api', async (req, res) => {
  try {
    const response = await axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    res.status(500).json({ error: 'Failed to fetch daily quote' });
  }
});

// Route to search quotes by author name
app.get('/search', async (req, res) => {
  const { author } = req.query;
  try {
    const response = await axios.get(`http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en&author=${author}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching quotes by author:', error);
    res.status(500).json({ error: 'Failed to search quotes by author' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
