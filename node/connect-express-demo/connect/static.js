var connect = require('connect'),
  http = require('http');

/*
 * connect
 */
connect(connect.static(__dirname + '/public')).listen(3000, function () {
  console.log('Connect started on port 3000');
});

/*
 * http.Server
 */
http.createServer(
  function (req, res) {
    var url = require('url'),
      fs = require('fs'),
      pathname = __dirname + '/public' + url.parse(req.url).pathname;

    fs.readFile(pathname, function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end('500');
      } else {
        res.end(data);
      }
    });
  }).listen(3001, function () {
    console.log('http.Server started on port 3001');
  });