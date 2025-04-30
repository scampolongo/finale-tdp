const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs');

const NEWS_API_KEY = process.env.NEWSAPI_KEY;
const TWELVE_API_KEY = process.env.TWELVEDATA_KEY;

// stock endpoint
router.get('/stock', async (req, res) => {
  const symbol = req.query.symbol || 'SPX';
  try {
    const resp = await axios.get('https://api.twelvedata.com/time_series', {
      params: { symbol, interval: '1day', outputsize: 180, apikey: TWELVE_API_KEY }
    });
    res.json(resp.data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// news endpoint
router.get('/news', async (req, res) => {
  try {
    const resp = await axios.get('https://newsapi.org/v2/everything', {
      params: { q: 'Trump tariffs', apiKey: NEWS_API_KEY }
    });
    res.json(resp.data);
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

// tariffs update
router.post('/tariffs', (req, res) => {
  const tariffs = req.body;
  fs.writeFileSync('./data/tariffs.json', JSON.stringify(tariffs, null, 2));
  res.json({ status: 'ok' });
});


// full article scraping endpoint
router.get('/fullnews', async (req, res) => {
  const url = req.query.url;
  try {
    const resp = await axios.get(url);
    const html = resp.data;
    const paragraphs = [];
    const re = /<p[^>]*>(.*?)<\/p>/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      paragraphs.push(m[1].replace(/<.*?>/g, ''));
    }
    res.json({ content: paragraphs.join('\n\n') });
  } catch (e) {
    res.status(500).json({ error: e.toString() });
  }
});

module.exports = router;
