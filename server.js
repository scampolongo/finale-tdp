require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const fs = require('fs');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  const history = JSON.parse(fs.readFileSync('./data/history.json'));
  res.render('history', { history });
});
app.get('/charts', (req, res) => res.render('charts'));
app.get('/news', (req, res) => res.render('news'));
app.get('/tariffs', (req, res) => {
  const tariffs = JSON.parse(fs.readFileSync('./data/tariffs.json'));
  res.render('tariffs', { tariffs });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server in ascolto su 127.0.0.1:${PORT}`));
