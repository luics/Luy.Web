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
    fd = fs.openSync(JS_LOG, 'a'),
    count = 0;

  http.createServer(
    function (req, res) {
      ++count;
      var log = count + ' ' + new Date().getMilliseconds(),
        msg = querystring.parse(req.url.split('?')[1]).m;

      fs.write(fd, log + '\n');

      client.query(INSERT, [Math.random() * 200, msg + log], function (err, info) {
      });

      res.writeHead(200, {
        "Content-Type":"text/html",
        "Content-Length":11
      });
      res.end('target-node');
    }).listen(8000);
  console.log('Server Started: target-node');
});