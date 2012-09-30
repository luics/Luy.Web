var connect = require('connect');


//connect(function (req, res) {
//  res.end('ok '+ (+new Date));
//}).listen(8080);

var app = connect();

app.use(
  function (req, res) {
    res.end('ok ' + (+new Date));
  }).listen(8080);
