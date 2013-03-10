/**
 * Send an HTTP GET request for the specified URL.  If a successful
 * response is received, it is converted to an object based on the
 * Content-Type header and passed to the specified callback function.
 * Additional arguments may be specified as properties of the options object.
 *
 * If an error response is received (e.g., a 404 Not Found error),
 * the status code and message are passed to the options.errorHandler
 * function.  If no error handler is specified, the callback
 * function is called instead with a null argument.
 * 
 * If the options.parameters object is specified, its properties are
 * taken as the names and values of request parameters.  They are
 * converted to a URL-encoded string with HTTP.encodeFormData() and
 * are appended to the URL following a '?'.
 * 
 * If an options.progressHandler function is specified, it is
 * called each time the readyState property is set to some value less
 * than 4.  Each call to the progress handler function is passed an
 * integer that specifies how many times it has been called.
 *
 * If an options.timeout value is specified, the XMLHttpRequest
 * is aborted if it has not completed before the specified number
 * of milliseconds have elapsed.  If the timeout elapses and an
 * options.timeoutHandler is specified, that function is called with
 * the requested URL as its argument.
 **/
HTTP.get = function(url, callback, options) {
    var request = HTTP.newRequest();
    var n = 0;
    var timer;
    if (options.timeout)
        timer = setTimeout(function() {
                               request.abort();
                               if (options.timeoutHandler)
                                   options.timeoutHandler(url);
                           },
                           options.timeout);

    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (timer) clearTimeout(timer);
            if (request.status == 200) {
                callback(HTTP._getResponse(request));
            }
            else {
                if (options.errorHandler)
                    options.errorHandler(request.status,
                                         request.statusText);
                else callback(null);
            }
        }
        else if (options.progressHandler) {
            options.progressHandler(++n);
        }
    }

    var target = url;
    if (options.parameters)
        target += "?" + HTTP.encodeFormData(options.parameters)
    request.open("GET", target);
    request.send(null);
};
