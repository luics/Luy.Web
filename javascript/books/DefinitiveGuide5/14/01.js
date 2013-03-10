/*
 * This function parses ampersand-separated name=value argument pairs from
 * the query string of the URL. It stores the name=value pairs in 
 * properties of an object and returns that object. Use it like this:
 * 
 * var args = getArgs();  // Parse args from URL
 * var q = args.q || "";  // Use argument, if defined, or a default value
 * var n = args.n ? parseInt(args.n) : 10; 
 */
function getArgs() {
    var args = new Object();
    var query = location.search.substring(1);     // Get query string
    var pairs = query.split("&");                 // Break at ampersand
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');          // Look for "name=value"
        if (pos == -1) continue;                  // If not found, skip
        var argname = pairs[i].substring(0,pos);  // Extract the name
        var value = pairs[i].substring(pos+1);    // Extract the value
        value = decodeURIComponent(value);        // Decode it, if needed
        args[argname] = value;                    // Store as a property
    }
    return args;                                  // Return the object
}
