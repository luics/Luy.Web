/**
 * getElements(classname, tagname, root):
 * Return an array of DOM elements that are members of the specified class,
 * have the specified tagname, and are descendants of the specified root.
 * 
 * If no classname is specified, elements are returned regardless of class.
 * If no tagname is specified, elements are returned regardless of tagname.
 * If no root is specified, the document object is used.  If the specified
 * root is a string, it is an element id, and the root
 * element is looked up using getElementsById()
 */
function getElements(classname, tagname, root) {
    // If no root was specified, use the entire document
    // If a string was specified, look it up
    if (!root) root = document;
    else if (typeof root == "string") root = document.getElementById(root);
    
    // if no tagname was specified, use all tags
    if (!tagname) tagname = "*";

    // Find all descendants of the specified root with the specified tagname
    var all = root.getElementsByTagName(tagname);

    // If no classname was specified, we return all tags
    if (!classname) return all;

    // Otherwise, we filter the element by classname
    var elements = [];  // Start with an emtpy array
    for(var i = 0; i < all.length; i++) {
        var element = all[i];
        if (isMember(element, classname)) // isMember() is defined below
            elements.push(element);       // Add class members to our array
    }

    // Note that we always return an array, even if it is empty
    return elements;

    // Determine whether the specified element is a member of the specified
    // class.  This function is optimized for the common case in which the 
    // className property contains only a single classname.  But it also 
    // handles the case in which it is a list of whitespace-separated classes.
    function isMember(element, classname) {
        var classes = element.className;  // Get the list of classes
        if (!classes) return false;             // No classes defined
        if (classes == classname) return true;  // Exact match

        // We didn't match exactly, so if there is no whitespace, then 
        // this element is not a member of the class
        var whitespace = /\s+/;
        if (!whitespace.test(classes)) return false;

        // If we get here, the element is a member of more than one class and
        // we've got to check them individually.
        var c = classes.split(whitespace);  // Split with whitespace delimiter
        for(var i = 0; i < c.length; i++) { // Loop through classes
            if (c[i] == classname) return true;  // and check for matches
        }

        return false;  // None of the classes matched
    }
}
