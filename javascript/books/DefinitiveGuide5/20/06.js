HTTP._getResponse = function(request) {
    // Check the content type returned by the server
    switch(request.getResponseHeader("Content-Type")) {
    case "text/xml":
        // If it is an XML document, use the parsed Document object
        return request.responseXML;

    case "text/json":
    case "application/json":
    case "text/javascript":
    case "application/javascript":
    case "application/x-javascript":
        // If the response is JavaScript code, or a JSON-encoded value,
        // call eval() on the text to "parse" it to a JavaScript value.
        // Note: only do this if the JavaScript code is from a trusted server!
        return eval(request.responseText);

    default:
        // Otherwise, treat the response as plain text and return as a string
        return request.responseText;
    }
};
