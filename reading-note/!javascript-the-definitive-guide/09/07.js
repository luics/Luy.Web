// Return true if each of the method properties in c.prototype have been 
// borrowed by o. If o is a function rather than an object, we
// test the prototype of o rather than o itself.
// Note that this function requires methods to be copied, not
// reimplemented.  If a class borrows a method and then overrides it,
// this method will return false.
function borrows(o, c) {
    // If we are an instance of something then of course we have its methods
    if (o instanceof c) return true;

    // It is impossible to test whether the methods of a built-in type have
    // been borrowed, since the methods of built-in types are not enumerable.
    // We return undefined in this case as a kind of "I don't know" answer
    // instead of throwing an exception. Undefined behaves much like false,
    // but can be distinguished from false if the caller needs to.
    if (c == Array || c == Boolean || c == Date || c == Error ||
        c == Function || c == Number || c == RegExp || c == String)
        return undefined;

    if (typeof o == "function") o = o.prototype;
    var proto = c.prototype;
    for(var p in proto) {
        // Ignore properties that are not functions
        if (typeof proto[p] != "function") continue;
        if (o[p] != proto[p]) return false;
    }
    return true;
}
