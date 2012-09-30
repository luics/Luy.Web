var express = require('express');
var app = express();

app.get('/', function(req, res){
  console.info('get', req);
  res.send('Hello World 你好');
});

app.listen(3000);