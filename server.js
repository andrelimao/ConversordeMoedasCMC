const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// API endpoint to fetch data from CoinMarketCap
app.get('/api', async (req, res) => {
  const apiKey = 'wwwwwwww';
  const fromCurrency = req.query.from;
  const toCurrency = req.query.to;
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${fromCurrency}&convert=${toCurrency}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'X-CMC_PRO_API_KEY': apiKey,
        
      

      },
    });
    const data = response.data.data[fromCurrency];
    res.json(data);
    res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline'");
  } catch (error) {
    console.error('Error fetching data from CoinMarketCap:', error);
    res.status(500).json({ error: 'Failed to fetch data from CoinMarketCap' });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));