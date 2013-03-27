// Return true if o has methods with the same name and arity as all
// methods in c.prototype. Otherwise, return false.  Throws an exception
// if c is a built-in type with nonenumerable methods.
function provides(o, c) {
    // If o actually is an instance of c, it obviously looks like c
    if (o instanceof c) return true;

    // If a constructor was passed instead of an object, use its prototype
    if (typeof o == "function") o = o.prototype;

    // The methods of built-in types are not enumerable, and we return 
    // undefined.  Otherwise any object would appear to provide any of
    // the built-in types. 
    if (c == Array || c == Boolean || c == Date || c == Error ||
        c == Function || c == Number || c == RegExp || c == String)
        return undefined;

    var proto = c.prototype;
    for(var p in proto) {  // Loop through all properties in c.prototype
        // Ignore properties that are not functions
        if (typeof proto[p] != "function") continue;
        // If o does not have a property by the same name return false
        if (!(p in o)) return false;
        // If that property is not a function, return false
        if (typeof o[p] != "function") return false;
        // If the two functions are not declared with the same number
        // of arguments return false.
        if (o[p].length != proto[p].length) return false;
    }
    // If all the methods check out, we can finally return true.
    return true;
}
