function isArrayLike(x) {
    if (x instanceof Array) return true; // Real arrays are array-like
    if (!("length" in x)) return false;  // Arrays must have a length property
    if (typeof x.length != "number") return false;  // Length must be a number
    if (x.length < 0) return false;                 // and nonnegative
    if (x.length > 0) { 
        // If the array is nonempty, it must at a minimum
        // have a property defined whose name is the number length-1
        if (!((x.length-1) in x)) return false;
    }
    return true;
}
