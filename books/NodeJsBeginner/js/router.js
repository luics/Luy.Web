exports.route = function(handle, pathname, response, request) {
  console.log("[router] a request for " + pathname);
  
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    console.log("No request handler found for " + pathname);   
    response.writeHead(404, {
      "Content-Type": "text/html"
    });
    response.write('<html><head><title>404 Not Found</title></head><body>');
    response.write('<h1>404 Not Found</h1>');
    response.write('</body></html>');
    response.end();
  }
}
