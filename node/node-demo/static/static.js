var
    http = require('http'),
    url = require('url'),
    fs = require('fs');

// 创建并启动服务器
// 浏览器地址栏输入 http://127.0.0.1:3001/demo.html
http.createServer(function (req, res) {
    var pathname = __dirname + '/public' + url.parse(req.url).pathname;

    // 读取本地文件
    // node的设计理念之一：web server每个处理环节都是异步的
    fs.readFile(pathname, function (err, data) {
        if (err) {
            res.writeHead(500);
            res.end('500');
        } else {
            // 这里可以对文件类型判断，增加Content-Type
            res.end(data);
        }
    });

}).listen(3001, function () {
        console.log('http.Server started on port 3001');
    });