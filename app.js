const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.redirect('/about');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/calculadora', (req, res) => {
  res.render('calculadora');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
