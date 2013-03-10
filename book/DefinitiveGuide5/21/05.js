/**
 * Return a Document object that holds the contents of the <xml> tag
 * with the specified id.  If the <xml> tag has a src attribute, an XML
 * document is loaded from that URL and returned instead.
 *
 * Since data islands are often looked up more than once, this function caches
 * the documents it returns.
 */
XML.getDataIsland = function(id) {
    var doc;

    // Check the cache first
    doc = XML.getDataIsland.cache[id];
    if (doc) return doc;
    
    // Look up the specified element
    doc = document.getElementById(id);

    // If there is a "src" attribute, fetch the Document from that URL
    var url = doc.getAttribute('src');
    if (url) {
        doc = XML.load(url);
    }
    // Otherwise, if there was no src attribute, the content of the <xml>
    // tag is the document we want to return.  In Internet Explorer, doc is
    // already the document object we want. In other browsers, doc refers to
    // an HTML element, and we've got to copy the content of that element
    // into a new document object
    else if (!doc.documentElement) {// If this is not already a document...

        // First, find the document element within the <xml> tag.  This is
        // the first child of the <xml> tag that is an element, rather
        // than text, comment or processing instruction
        var docelt = doc.firstChild;
        while(docelt != null) {
            if (docelt.nodeType == 1 /*Node.ELEMENT_NODE*/) break;
            docelt = docelt.nextSibling;
        }
        
        // Create an empty document
        doc = XML.newDocument();
        
        // If the <xml> node had some content, import it into the new document
        if (docelt) doc.appendChild(doc.importNode(docelt, true));
    }

    // Now cache and return the document.
    XML.getDataIsland.cache[id] = doc;
    return doc;
};
XML.getDataIsland.cache = {}; // Initialize the cache
