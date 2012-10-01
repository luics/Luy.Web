var connect = require('connect'),
  util = require('util');


connect()
  .use(connect.static(__dirname+'/public'))
  .use(connect.bodyParser())
  .use(
  function (req, res) {
    var user = req.body.user;
    res.end(util.format('[user] %s, %s', user.name, user.age));
  }).listen(8080);

// $ curl -d '{"user":{"name":"xukai01","age": 26}}' -H "Content-Type: application/json" http://local:8080