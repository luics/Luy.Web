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
