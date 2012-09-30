var connect = require('connect');


connect()
  .use(connect.bodyParser())
  .use(
  function (req, res) {
    res.end('viewing user ' + req.body.user.name + ', ' + req.body.user.age);
  }).listen(8080);