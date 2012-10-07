var connect = require('connect'),
  http = require('http'),
  util = require('util');

/*
 * connect
 * $ curl -d '{"user":{"name":"xukai01","age": 26}}' -H "Content-Type: application/json" http://local:3000
 */
connect(connect.bodyParser(),
  function (req, res) {
    var user = req.body.user;
    res.end(util.format('[user] [node-connect] %s, %s', user.name, user.age));
  }).listen(3000, function () {
    console.log('Connect started on port 3000');
  });


/*
 * http.Server
 */
http.createServer(
  function (req, res) {
    var data = [];

    req.on('data', function abc(chunk) {
      data.push(chunk);
    });

    req.on('end', function () {
      var user = JSON.parse(data.join('')).user;
      res.end(util.format('[user] [node-http] %s, %s', user.name, user.age));
    });
  }).listen(3001, function () {
    console.log('http.Server started on port 3001');
  });