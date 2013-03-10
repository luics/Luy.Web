// Reverse the order of the children of Node n
function reverse(n) { 
    // Create an empty DocumentFragment as a temporary container
    var f = document.createDocumentFragment(); 

    // Now loop backward through the children, moving each one to the fragment.
    // The last child of n becomes the first child of f, and vice-versa.
    // Note that appending a child to f automatically removes it from n.
    while(n.lastChild) f.appendChild(n.lastChild); 

    // Finally, move the children of f all at once back to n, all at once.
    n.appendChild(f);
}
