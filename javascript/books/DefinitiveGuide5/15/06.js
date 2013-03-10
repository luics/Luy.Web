// This function recursively looks at Node n and its descendants, 
// converting all Text node data to uppercase
function upcase(n) {
    if (n.nodeType == 3 /*Node.TEXT_NODE*/) {
        // If the node is a Text node, create a new Text node that
        // holds the uppercase version of the node's text, and use the
        // replaceChild() method of the parent node to replace the
        // original node with the new uppercase node.
        n.data = n.data.toUpperCase();
    }
    else {
        // If the node is not a Text node, loop through its children
        // and recursively call this function on each child.
        var kids = n.childNodes;
        for(var i = 0; i < kids.length; i++) upcase(kids[i]);
    }
}
