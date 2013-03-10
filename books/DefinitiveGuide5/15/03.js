/** 
 * getText(n): Find all Text nodes at or beneath the node n.
 * Concatenate their content and return it as a string.
 */
function getText(n) {
    // Repeated string concatenation can be inefficient, so we collect
    // the value of all text nodes into an array, and then concatenate
    // the elements of that array all at once.
    var strings = [];
    getStrings(n, strings);
    return strings.join("");

    // This recursive function finds all text nodes and appends
    // their text to an array.
    function getStrings(n, strings) {
        if (n.nodeType == 3 /* Node.TEXT_NODE */) 
            strings.push(n.data);
        else if (n.nodeType == 1 /* Node.ELEMENT_NODE */) {
            // Note iteration with firstChild/nextSibling
            for(var m = n.firstChild; m != null; m = m.nextSibling) {
                getStrings(m, strings);
            }
        }
    }
}
