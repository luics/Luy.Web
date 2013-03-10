HTTP.getTextWithScript = function(url, callback) {
    // Create a new script element and add it to the document
    var script = document.createElement("script");
    document.body.appendChild(script);

    // Get a unique function name
    var funcname = "func" + HTTP.getTextWithScript.counter++;

    // Define a function with that name, using this function as a
    // convenient namespace.  The script generated on the server
    // invokes this function
    HTTP.getTextWithScript[funcname] = function(text) {
        // Pass the text to the callback function
        callback(text);

        // Clean up the script tag and the generated function
        document.body.removeChild(script);
        delete HTTP.getTextWithScript[funcname];
    }

    // Encode the URL we want to fetch and the name of the function
    // as arguments to the jsquoter.php server-side script.  Set the src
    // property of the script tag to fetch the URL
    script.src = "jsquoter.php" +
                 "?url=" + encodeURIComponent(url) + "&func=" +
                 encodeURIComponent("HTTP.getTextWithScript." + funcname);
}

// We use this to generate unique function callback names in case there
// is more than one request pending at a time.
HTTP.getTextWithScript.counter = 0;
