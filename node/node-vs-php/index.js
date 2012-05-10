var mblog = require('./mblog'),
  http = require('http'),
  mysql = require('mysql'),
  querystring = require('querystring'),
  fs = require('fs')        ,
  JS_LOG = __dirname + '/log/index.js.log',
  DB_CONF = {
    user:'root',
    password:'123456',
    database:'mblog'
  };

mblog.init(DB_CONF, function () {
  //clear log
  fs.writeFileSync(JS_LOG, '');

  //connect to mysql
  var client = mysql.createClient(DB_CONF),
    INSERT = 'INSERT INTO post(user,msg) VALUES (?,?)',
    fd = fs.openSync(JS_LOG, 'a');
  //count = 0;

  for (var i = 0; i < 4; ++i) {
    (function (port) {
      http.createServer(
        function (req, res) {
          var
            log = (+new Date),
            msg = querystring.parse(req.url.split('?')[1]).m;

          fs.write(fd, log + '\n');

          client.query(INSERT, [Math.random() * 200, msg], function (err, info) {
          });

          res.writeHead(200, {
            "Content-Type":"text/plain",
            "Content-Length":11
          });
          res.end('target-node');
        }).listen(port, function () {
          console.log('Server Started(%d): target-node', port);
        });
    })(8000 + i);
  }
});

/**
 * 同时启动多台node，看看是否能够提高并发
 */