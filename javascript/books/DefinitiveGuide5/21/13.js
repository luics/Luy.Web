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
