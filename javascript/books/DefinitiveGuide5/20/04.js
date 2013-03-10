/**
 * Use an HTTP HEAD request to obtain the headers for the specified URL.
 * When the headers arrive, parse them with HTTP.parseHeaders() and pass the
 * resulting object to the specified callback function. If the server returns
 * an error code, invoke the specified errorHandler function instead.  If no
 * error handler is specified, pass null to the callback function.
 */
HTTP.getHeaders = function(url, callback, errorHandler) {
    var request = HTTP.newRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(HTTP.parseHeaders(request));
            }
            else {
                if (errorHandler) errorHandler(request.status,
                                               request.statusText);
                else callback(null);
            }
        }
    }
    request.open("HEAD", url);
    request.send(null);
};

// Parse the response headers from an XMLHttpRequest object and return
// the header names and values as property names and values of a new object.
HTTP.parseHeaders = function(request) {
    var headerText = request.getAllResponseHeaders();  // Text from the server
    var headers = {}; // This will be our return value
    var ls = /^\s*/;  // Leading space regular expression
    var ts = /\s*$/;  // Trailing space regular expression

    // Break the headers into lines
    var lines = headerText.split("\n");
    // Loop through the lines
    for(var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line.length == 0) continue;  // Skip empty lines
        // Split each line at first colon, and trim whitespace away
        var pos = line.indexOf(':');     
        var name = line.substring(0, pos).replace(ls, "").replace(ts, "");
        var value = line.substring(pos+1).replace(ls, "").replace(ts, "");
        // Store the header name/value pair in a JavaScript object
        headers[name] = value;
    }
    return headers;
};
