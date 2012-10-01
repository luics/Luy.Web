var connect = require('connect'),
  http = require('http');

/*
 * connect
 */
connect(connect.static(__dirname + '/public')).listen(8080, function () {
  console.log('[inited] [node-connect]', 8080)
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
  }).listen(8081, function () {
    console.log('[inited] [node-http]', 8081)
  });