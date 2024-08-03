const express = require('express');
const router = express.Router();

// Redirige la raíz a /about
router.get('/', (req, res) => {
  res.redirect('/about');
});

// Renderiza la vista de /about
router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
