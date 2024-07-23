const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Acerca de Nosotros' });
});

module.exports = router;
