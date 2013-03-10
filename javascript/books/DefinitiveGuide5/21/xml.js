/**
 * xml.js: utilities for creating, loading, parsing, serializing,
 *         transforming and extracting data from XML documents.
 *
 * From the book JavaScript: The Definitive Guide, 5th Edition,
 * by David Flanagan. Copyright 2006 O'Reilly Media, Inc. (ISBN: 0596101996)
 */

// Make sure we haven't already been loaded
var XML;
if (XML && (typeof XML != "object" || XML.NAME))
    throw new Error("Namespace 'XML' already exists");

// Create our namespace, and specify some meta-information
XML = {};
XML.NAME = "XML";     // The name of this namespace
XML.VERSION = 1.0;    // The version of this namespace

/**
 * Create a new Document object.  If no arguments are specified, 
 * the document will be empty.  If a root tag is specified, the document
 * will contain that single root tag.  If the root tag has a namespace
 * prefix, the second argument must specify the URL that identifies the
 * namespace.
 */
XML.newDocument = function(rootTagName, namespaceURL) {
    if (!rootTagName) rootTagName = "";
    if (!namespaceURL) namespaceURL = "";
    
    if (document.implementation && document.implementation.createDocument) {
        // This is the W3C standard way to do it
        return document.implementation.createDocument(namespaceURL,
                                                      rootTagName, null);
    }
    else { // This is the IE way to do it
        // Create an empty document as an ActiveX object
        // If there is no root element, this is all we have to do
        var doc = new ActiveXObject("MSXML2.DOMDocument");

        // If there is a root tag, initialize the document
        if (rootTagName) {
            // Look for a namespace prefix
            var prefix = "";
            var tagname = rootTagName;
            var p = rootTagName.indexOf(':');
            if (p != -1) {
                prefix = rootTagName.substring(0, p);
                tagname = rootTagName.substring(p+1);
            }

            // If we have a namespace, we must have a namespace prefix
            // If we don't have a namespace, we discard any prefix
            if (namespaceURL) {
                if (!prefix) prefix = "a0"; // What Firefox uses
            }
            else prefix = "";

            // Create the root element (with optional namespace) as a
            // string of text
            var text = "<" + (prefix?(prefix+":"):"") +  tagname +
                (namespaceURL
                 ?(" xmlns:" + prefix + '="' + namespaceURL +'"')
                 :"") +
                "/>";
            // And parse that text into the empty document
            doc.loadXML(text);
        }
        return doc;
    }
};

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

/**
 * Asynchronously load and parse an XML document from the specified URL.
 * When the document is ready, pass it to the specified callback function.
 * This function returns immediately with no return value.
 */
XML.loadAsync = function(url, callback) {
    var xmldoc = XML.newDocument();

    // If we created the XML document using createDocument, use
    // onload to determine when it is loaded
    if (document.implementation && document.implementation.createDocument) {
        xmldoc.onload = function() { callback(xmldoc); };
    }
    // Otherwise, use onreadystatechange as with XMLHttpRequest
    else {
        xmldoc.onreadystatechange = function() {
            if (xmldoc.readyState == 4) callback(xmldoc);
        };
    }

    // Now go start the download and parsing
    xmldoc.load(url);
};

/**
 * Parse the XML document contained in the string argument and return 
 * a Document object that represents it.
 */
XML.parse = function(text) {
    if (typeof DOMParser != "undefined") {
        // Mozilla, Firefox, and related browsers
        return (new DOMParser()).parseFromString(text, "application/xml");
    }
    else if (typeof ActiveXObject != "undefined") {
        // Internet Explorer.
        var doc = XML.newDocument();  // Create an empty document
        doc.loadXML(text);            // Parse text into it
        return doc;                   // Return it
    }
    else {
        // As a last resort, try loading the document from a data: URL
        // This is supposed to work in Safari.  Thanks to Manos Batsis and
        // his Sarissa library (sarissa.sourceforge.net) for this technique.
        var url = "data:text/xml;charset=utf-8," + encodeURIComponent(text);
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        return request.responseXML;
    }
};

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

/**
 * This XML.Transformer class encapsulates an XSL stylesheet.
 * If the stylesheet parameter is a URL, we load it.
 * Otherwise, we assume it is an appropriate DOM Document
 */
XML.Transformer = function(stylesheet) {
    // Load the stylesheet if necessary
    if (typeof stylesheet == "string") stylesheet = XML.load(stylesheet);
    this.stylesheet = stylesheet;

    // In Mozilla-based browsers, create an XSLTProcessor object and
    // tell it about the stylesheet.
    if (typeof XSLTProcessor != "undefined") {
        this.processor = new XSLTProcessor();
        this.processor.importStylesheet(this.stylesheet);
    }
};

/**
 * This is the transform() method of the XML.Transformer class.
 * It transforms the specified xml node using the encapsulated stylesheet.
 * The results of the transformation are assumed to be HTML and are used to
 * replace the content of the specified element
 */
XML.Transformer.prototype.transform = function(node, element) {
    // If element is specified by id, look it up
    if (typeof element == "string") element = document.getElementById(element);

    if (this.processor) {
        // If we've created an XSLTProcessor (i.e. we're in Mozilla) use it.
        // Transform the node into a DOM DocumentFragment
        var fragment = this.processor.transformToFragment(node, document);
        // Erase the existing content of element
        element.innerHTML = "";
        // And insert the transformed nodes
        element.appendChild(fragment);
    }
    else if ("transformNode" in node) {
        // If the node has a transformNode() function (in IE), use that.
        // Note that transformNode() returns a string.
        element.innerHTML = node.transformNode(this.stylesheet);
    }
    else {
        // Otherwise, we're out of luck
        throw "XSLT is not supported in this browser";
    }
};

/**
 * This is an XSLT utility function that is useful when a stylesheet is
 * used only once.
 */
XML.transform = function(xmldoc, stylesheet, element) {
    var transformer = new XML.Transformer(stylesheet);
    transformer.transform(xmldoc, element);
}

/**
 * XML.XPathExpression is a class that encapsulates an XPath query and its
 * associated namespace prefix-to-URL mapping.  Once an XML.XPathExpression
 * object has been created, it can be evaluated one or more times (in one
 * or more contexts) using the getNode() or getNodes() methods.
 *
 * The first argument to this constructor is the text of the XPath expression.
 * 
 * If the expression includes any XML namespaces, the second argument must
 * be a JavaScript object that maps namespace prefixes to the URLs that define
 * those namespaces.  The properties of this object are the prefixes, and
 * the values of those properties are the URLs.
 */
XML.XPathExpression = function(xpathText, namespaces) {
    this.xpathText = xpathText;    // Save the text of the expression
    this.namespaces = namespaces;  // And the namespace mapping

    if (document.createExpression) {
        // If we're in a W3C-compliant browser, use the W3C API
        // to compile the text of the XPath query
        this.xpathExpr = 
            document.createExpression(xpathText, 
                                      // This function is passed a 
                                      // namespace prefix and returns the URL.
                                      function(prefix) {
                                          return namespaces[prefix];
                                      });
    }
    else {
        // Otherwise, we assume for now that we're in IE and convert the
        // namespaces object into the textual form that IE requires.
        this.namespaceString = "";
        if (namespaces != null) {
            for(var prefix in namespaces) {
                // Add a space if there is already something there
                if (this.namespaceString) this.namespaceString += ' ';
                // And add the namespace
                this.namespaceString += 'xmlns:' + prefix + '="' +
                    namespaces[prefix] + '"';
            }
        }
    }
};

/**
 * This is the getNodes() method of XML.XPathExpression.  It evaluates the
 * XPath expression in the specified context.  The context argument should
 * be a Document or Element object.  The return value is an array 
 * or array-like object containing the nodes that match the expression.
 */
XML.XPathExpression.prototype.getNodes = function(context) {
    if (this.xpathExpr) {
        // If we are in a W3C-compliant browser, we compiled the
        // expression in the constructor.  We now evaluate that compiled
        // expression in the specified context
        var result =
            this.xpathExpr.evaluate(context, 
                                    // This is the result type we want
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null);

        // Copy the results we get into an array.
        var a = new Array(result.snapshotLength);
        for(var i = 0; i < result.snapshotLength; i++) {
            a[i] = result.snapshotItem(i);
        }
        return a;
    }
    else {
        // If we are not in a W3C-compliant browser, attempt to evaluate
        // the expression using the IE API.
        try {
            // We need the Document object to specify namespaces
            var doc = context.ownerDocument;
            // If the context doesn't have ownerDocument, it is the Document
            if (doc == null) doc = context;
            // This is IE-specific magic to specify prefix-to-URL mapping
            doc.setProperty("SelectionLanguage", "XPath");
            doc.setProperty("SelectionNamespaces", this.namespaceString);

            // In IE, the context must be an Element not a Document, 
            // so if context is a document, use documentElement instead
            if (context == doc) context = doc.documentElement;
            // Now use the IE method selectNodes() to evaluate the expression
            return context.selectNodes(this.xpathText);
        }
        catch(e) {
            // If the IE API doesn't work, we just give up
            throw "XPath not supported by this browser.";
        }
    }
}

/**
 * This is the getNode() method of XML.XPathExpression.  It evaluates the
 * XPath expression in the specified context and returns a single matching
 * node (or null if no node matches).  If more than one node matches,
 * this method returns the first one in the document.
 * The implementation differs from getNodes() only in the return type.
 */
XML.XPathExpression.prototype.getNode = function(context) {
    if (this.xpathExpr) {
        var result =
            this.xpathExpr.evaluate(context, 
                                    // We just want the first match
                                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                                    null);
        return result.singleNodeValue;
    }
    else {
        try {
            var doc = context.ownerDocument;
            if (doc == null) doc = context;
            doc.setProperty("SelectionLanguage", "XPath");
            doc.setProperty("SelectionNamespaces", this.namespaceString);
            if (context == doc) context = doc.documentElement;
            // In IE call selectSingleNode instead of selectNodes
            return context.selectSingleNode(this.xpathText);
        }
        catch(e) {
            throw "XPath not supported by this browser.";
        }
    }
};

// A utility to create an XML.XPathExpression and call getNodes() on it
XML.getNodes = function(context, xpathExpr, namespaces) {
    return (new XML.XPathExpression(xpathExpr, namespaces)).getNodes(context);
};

// A utility to create an XML.XPathExpression and call getNode() on it
XML.getNode  = function(context, xpathExpr, namespaces) {
    return (new XML.XPathExpression(xpathExpr, namespaces)).getNode(context);
};

/**
 * Serialize an XML Document or Element and return it as a string.
 */
XML.serialize = function(node) {
    if (typeof XMLSerializer != "undefined")
        return (new XMLSerializer()).serializeToString(node);
    else if (node.xml) return node.xml;
    else throw "XML.serialize is not supported or can't serialize " + node;
};

/*
 * Expand any templates at or beneath element e.
 * If any of the templates use XPath expressions with namespaces, pass
 * a prefix-to-URL mapping as the second argument as with XML.XPathExpression()
 * 
 * If e is not supplied, document.body is used instead.  A common 
 * use case is to call this function with no arguments in response to an
 * onload event handler.  This automatically expands all templates.
 */
XML.expandTemplates = function(e, namespaces) {
    // Fix up arguments a bit.
    if (!e) e = document.body;
    else if (typeof e == "string") e = document.getElementById(e);
    if (!namespaces) namespaces = null; // undefined does not work

    // An HTML element is a template if it has a "datasource" attribute.
    // Recursively find and expand all templates.  Note that we don't
    // allow templates within templates.
    if (e.getAttribute("datasource")) {
        // If it is a template, expand it.
        XML.expandTemplate(e, namespaces);
    }
    else {
        // Otherwise, recurse on each of the children.  We make a static 
        // copy of the children first so that expanding a template doesn't
        // mess up our iteration.
        var kids = []; // To hold copy of child elements
        for(var i = 0; i < e.childNodes.length; i++) {
            var c = e.childNodes[i];
            if (c.nodeType == 1) kids.push(e.childNodes[i]);
        }
        
        // Now recurse on each child element
        for(var i = 0; i < kids.length; i++)
            XML.expandTemplates(kids[i], namespaces);
    }
};

/**
 * Expand a single specified template.
 * If the XPath expressions in the template use namespaces, the second
 * argument must specify a prefix-to-URL mapping
 */
XML.expandTemplate = function(template, namespaces) {
    if (typeof template=="string") template=document.getElementById(template);
    if (!namespaces) namespaces = null; // Undefined does not work

    // The first thing we need to know about a template is where the 
    // data comes from.  
    var datasource = template.getAttribute("datasource");

    // If the datasource attribute begins with '#', it is the name of
    // an XML data island.  Otherwise, it is the URL of an external XML file
    var datadoc;
    if (datasource.charAt(0) == '#')   // Get data island
        datadoc = XML.getDataIsland(datasource.substring(1));
    else                               // Or load external document
        datadoc = XML.load(datasource);

    // Now figure out which nodes in the datasource will be used to 
    // provide the data.  If the template has a foreach attribute,
    // we use it as an XPath expression to get a list of nodes.  Otherwise
    // we use all child elements of the document element
    var datanodes;
    var foreach = template.getAttribute("foreach");
    if (foreach) datanodes = XML.getNodes(datadoc, foreach, namespaces);
    else {
        // If there is no "foreach" attribute, use the element
        // children of the documentElement
        datanodes = [];
        for(var c=datadoc.documentElement.firstChild; c!=null; c=c.nextSibling)
            if (c.nodeType == 1) datanodes.push(c);
    }

    // Remove the template element from its parent,
    // but remember the parent, and also the nextSibling of the template.
    var container = template.parentNode;
    var insertionPoint = template.nextSibling;
    template = container.removeChild(template);

    // For each element of the datanodes array, we'll insert a copy of
    // the template back into the container.  Before doing this, though, we
    // expand any child in the copy that has a "data" attribute.
    for(var i = 0; i < datanodes.length; i++) {
        var copy = template.cloneNode(true);           // Copy template
        expand(copy, datanodes[i], namespaces);        // Expand copy
        container.insertBefore(copy, insertionPoint);  // Insert copy
    }

    // This nested function finds any child elements of e that have a data
    // attribute.  It treats that attribute as an XPath expression and
    // evaluates it in the context of datanode.  It takes the text value of
    // the XPath result and makes it the content of the HTML node being
    // expanded.  All other content is deleted
    function expand(e, datanode, namespaces) {
        for(var c = e.firstChild; c != null; c = c.nextSibling) {
            if (c.nodeType != 1) continue;  // elements only
            var dataexpr = c.getAttribute("data");
            if (dataexpr) {
                // Evaluate XPath expression in context
                var n = XML.getNode(datanode, dataexpr, namespaces);
                // Delete any content of the element
                c.innerHTML = "";
                // And insert the text content of the XPath result
                c.appendChild(document.createTextNode(getText(n)));
            }
            // If we don't expand the element, recurse on it.
            else expand(c, datanode, namespaces);
        }
    }

    // This nested function extracts the text from a DOM node, recursing
    // if necessary
    function getText(n) {
        switch(n.nodeType) {
        case 1: /* element */
            var s = "";
            for(var c = n.firstChild; c != null; c = c.nextSibling)
                s += getText(c);
            return s;
        case 2: /* attribute*/
        case 3: /* text */
        case 4: /* cdata */
            return n.nodeValue;
        default: 
            return "";
        }
    }
    
};
