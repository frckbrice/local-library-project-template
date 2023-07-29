var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
  next();
});

/* test: display You're so cool */
router.get('/cool', function(req, res, next) {
  res.send('Youre so cool');
  next();
});

module.exports = router;
