var http = require('http'),
  url = require('url');

var server = http.createServer();
server.listen(8080);

/**
 * /api/http.html#http_class_http_server
 */

server.on('listening', function () {
  console.log("[listening]", arguments);
});

server.on('connection', function (socket) {
  console.log("[connection]");//, socket
});

server.on('checkContinue', function () {
  console.log("[checkContinue]", arguments);
});

server.on('upgrade', function () {
  console.log("[upgrade]", arguments);
});

server.on('clientError', function () {
  console.log("[clientError]", arguments);
});

server.on('close', function () {
  console.log("[close]", arguments);
});
//setTimeout(function () {
//  server.close();
//}, 2000);

server.on('request', function (req, res) {
  var pathname = url.parse(req.url).pathname;
  console.log(req.method, pathname);
  req.on('data', function abc(chunk) {
    console.log("[req data]", arguments);
  });
  req.on('end', function () {
    console.log("[req end]", arguments);
  });
  req.on('close', function () {
    console.log("[req close]", arguments);
  });

  res.writeHead(200, 'cool', {
      "Set-Cookie":["type=ninja", "language=javascript"],
//      'Trailer':'Content-MD5',
      'Content-Type':'text/html;charset=utf-8' }
  );
  res.end('<!doctype html><html><body>ok</body></html>'); //<img src="/img" />
//  res.addTrailers({'Content-MD5': "7895bf4b8828b55ceaf47747b4bca667"});

//  console.log(req);
  console.log(res);
});




