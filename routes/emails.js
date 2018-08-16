var express = require('express');
var router = express.Router();

/* GET email listing. */
router.get('/', function(req, res, next) {
  res.json([
  	{id: 1, email: '123@gmail.com'},
  	{id: 2, email: '345@gmail.com'},
  	{id: 3, email: '567@gmail.com'},
  	])
});

module.exports = router;
