var connect = require('connect'),
  http = require('http'),
  util = require('util');

/*
 * connect
 */
connect(connect.bodyParser(),
  function (req, res) {
    var user = req.body.user;
    res.end(util.format('[user] [node-connect] %s, %s', user.name, user.age));
  }).listen(8080, function () {
    console.log('[inited] [node-connect]', 8080)
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
  }).listen(8081, function () {
    console.log('[inited] [node-http]', 8081)
  });