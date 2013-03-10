/**
 * Synchronously load the XML document at the specified URL and
 * return it as a Document object
 */
XML.load = function(url) {
    // Create a new document the previously defined function
    var xmldoc = XML.newDocument();  
    xmldoc.async = false;  // We want to load synchronously
    xmldoc.load(url);      // Load and parse
    return xmldoc;         // Return the document
};
