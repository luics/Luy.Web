var express = require('express');

var app = express();
app.use(express.cookieParser());
app.use(express.logger('dev'));

// Custom middleware
app.use(function (req, res, next) {
  if ('undefined' === typeof req.cookies.rememberme) {
    res.cookie('rememberme', Math.random(), { maxAge:900 * 1000, httpOnly:true });
  }
  //res.cookie('session-cookie', Math.random());
  next();
});

app.use(express.static(__dirname + '/public'));

// Routes
app.get('/html', function (req, res) {
  res.send(msg(req, true));
});
app.post('/html', function (req, res) {
  res.send(msg(req, true));
});
app.get('/json', function (req, res) {
  res.json(msg(req));
});
app.post('/json', function (req, res) {
  res.json(msg(req));
});
app.get('/download', function (req, res) {
  res.download(__dirname + '/public/demo.zip');
});

// Start server
app.listen(3000, function () {
  console.log('Express started on port 3000');
});

var msg = function (req, html) {
  var m = {method:req.method, path:req.path, msg:'Hello World'};
  if (html) m = '<b>' + m.method + ' ' + m.path + '</b> ' + m.msg;
  return m;
}
