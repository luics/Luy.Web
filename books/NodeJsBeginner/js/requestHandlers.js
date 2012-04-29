var querystring = require("querystring")
fs = require("fs"),
  formidable = require("formidable");

function start(response, postData) {
  console.log("[handler] 'start' was called.");
  var header = {
    "Content-Type": "text/html"
  },
  html = ['<html><head>',
  '<title>Start</title>',
  '<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />',
  '</head><body>',
  '<h1>Start</h1>',
  '<form action="/upload" enctype="multipart/form-data" method="post">',
  '<input type="file" name="upload">',
  '<input type="text" name="text">',
  '<input type="submit" value="Submit text" />',
  '</form>',
  '</body></html>'
  ].join('');
  
  response.writeHead(200, header);
  response.write(html);
  response.end();
  
//  exec("ls -lah", function (error, stdout, stderr) {
//    });
}

function upload(response, request) {
  console.log("[handler] 'upload' was called.");
  
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if(error) {
      response.writeHead(500, {
        "Content-Type": "text/plain"
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type": "image/png"
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

  //  function sleep(milliSeconds) {
  //    var startTime = new Date().getTime();
  //    while (new Date().getTime() < startTime + milliSeconds);
  //  }
  //  sleep(5000);