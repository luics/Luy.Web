var http = require("http"),
// utilities for working with file paths
path = require("path"),
// utilities for accessing the file system
fs = require("fs");

http.createServer(function (req, res) {
  
  // look for a filename in the URL, default to index.html
  var filename = path.basename(req.url) || "index.html",
  ext = path.extname(filename),
  // __dirname is a built-in variable containing the path where the code is running
  localPath = __dirname + "/public/";
  
  if (ext == ".html") {
    localPath += filename;
    // verify that this file actually exists and load it, or else return a 404
    path.exists(localPath, function (exists) {
      if (exists) {
        getFile(localPath, res);
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  }
  
}).listen(8000);

function getFile(localPath, res) {
  // read the file in and return it, or return a 500 if it can't be read
  fs.readFile(localPath, function(err, contents) {
    if (!err) {
      // use defaults instead of res.writeHead()
      res.end(contents);
    } else {
      res.writeHead(500);
      res.end();
    }
  });
}