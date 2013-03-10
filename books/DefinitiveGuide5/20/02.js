/**
 * Use XMLHttpRequest to fetch the contents of the specified URL using
 * an HTTP GET request.  When the response arrives, pass it (as plain
 * text) to the specified callback function.
 * 
 * This function does not block and has no return value.
 */
HTTP.getText = function(url, callback) {
    var request = HTTP.newRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200)
            callback(request.responseText);
    }
    request.open("GET", url);
    request.send(null);
};
