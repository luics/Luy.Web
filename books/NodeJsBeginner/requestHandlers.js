var querystring = require("querystring"),
fs = require("fs"),
formidable = require("formidable"),
url = require("url");

var UPLOAD = 'D:/Documents/NetBeansProjects/Luy.Web.git/books/NodeJsBeginner/tmp';

function start(response) {
  console.log("Request handler 'start' was called.");
  
  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';
  
  response.writeHead(200, {
    "Content-Type" : "text/html"
  });
  response.write(body);
  response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function (error, fields, files) {
    console.log("parsing done");
    
    var file = ( + new Date);
    /* Possible error on Windows systems:
    tried to rename to an already existing file */
    fs.rename(files.upload.path, UPLOAD + '/' + file, function (err) {
      if (err) {
        fs.unlink(UPLOAD + '/' + file);
        fs.rename(files.upload.path, UPLOAD + '/' + file);
      }
    });
	
    response.writeHead(200, {
      "Content-Type" : "text/html"
    });
    response.write("received image:<br/>");
    response.write('<img src="/show?file=' + file + '" />');
    response.end();
  });
}

function show(response, request) {
  console.log("Request handler 'show' was called.");
  var filename = querystring.parse(url.parse(request.url).query).file;
  filename = filename || 'debug.png';
  console.log(filename);
  responseFile(response, filename);
}

function responseFile(response, filename) {
  console.log("responseFile");
  
  fs.readFile(UPLOAD + '/' + filename, "binary", function (error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type" : "text/plain"
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type" : "image/png"
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

function favicon(response, request) {
  console.log("Request handler 'favicon' was called.");
  responseFile(response, 'favicon.ico');
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.favicon = favicon;
