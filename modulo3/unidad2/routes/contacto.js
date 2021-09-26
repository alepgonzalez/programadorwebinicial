var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Éste es el fomulario de Contacto');
});

module.exports = router;
