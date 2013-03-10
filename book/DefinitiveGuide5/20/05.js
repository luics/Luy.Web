/**
 * Send an HTTP POST request to the specified URL, using the names and values
 * of the properties of the values object as the body of the request.
 * Parse the server's response according to its content type and pass
 * the resulting value to the callback function.  If an HTTP error occurs,
 * call the specified errorHandler function, or pass null to the callback
 * if no error handler is specified.
 **/
HTTP.post = function(url, values, callback, errorHandler) {
    var request = HTTP.newRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status == 200) {
                callback(HTTP._getResponse(request));
            }
            else {
                if (errorHandler) errorHandler(request.status,
                                               request.statusText);
                else callback(null);
            }
        }
    }

    request.open("POST", url);
    // This header tells the server how to interpret the body of the request
    request.setRequestHeader("Content-Type",
                             "application/x-www-form-urlencoded");
    // Encode the properties of the values object and send them as
    // the body of the request.
    request.send(HTTP.encodeFormData(values));
};

/**
 * Encode the property name/value pairs of an object as if they were from
 * an HTML form, using application/x-www-form-urlencoded format
 */
HTTP.encodeFormData = function(data) {
    var pairs = [];
    var regexp = /%20/g; // A regular expression to match an encoded space

    for(var name in data) {
        var value = data[name].toString();
        // Create a name/value pair, but encode name and value first
        // The global function encodeURIComponent does almost what we want,
        // but it encodes spaces as %20 instead of as "+". We have to
        // fix that with String.replace()
        var pair = encodeURIComponent(name).replace(regexp,"+") + '=' +
            encodeURIComponent(value).replace(regexp,"+");
        pairs.push(pair);
    }

    // Concatenate all the name/value pairs, separating them with &
    return pairs.join('&');
};
