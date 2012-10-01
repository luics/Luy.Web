var connect = require('connect');


connect()
  .use(connect.bodyParser())
  .use(
  function (req, res) {
    res.end('viewing user ' + req.body.user.name + ', ' + req.body.user.age);
  }).listen(8080);

// $ curl -d '{"user":{"name":"xukai01","age": 26}}' -H "Content-Type: application/json" http://local:8080