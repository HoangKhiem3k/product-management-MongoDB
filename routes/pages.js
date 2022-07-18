var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// EJS demo
router.get('/ejs-demo', function(req, res, next) {
  res.render('ejsDemo', { 
    title: 'EJS Demo' ,
    items: [
      {name: 'MSI', price : 5000},
      {name: 'Dell', price : 4000},
      {name: 'Asus', price : 4000},
    ]
  });
});

module.exports = router;
