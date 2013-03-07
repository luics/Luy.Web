var connect = require('connect')
header = require('connect-header');

connect()
  .use(header({
  'SERVER':'connect-header-example/0.0.1',
  'X-ABC':'abc'
}))
  .use(
  function (req, res) {
    res.end('Hello World');
  }).listen(3000, function () {
    console.log('Connect started on port 3000');
  });