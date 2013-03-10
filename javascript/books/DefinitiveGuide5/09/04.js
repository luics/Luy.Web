// Borrow methods from one class for use by another.
// The arguments should be the constructor functions for the classes
// Methods of built-in types such as Object, Array, Date and RegExp are
// not enumerable and cannot be borrowed with this method.
function borrowMethods(borrowFrom, addTo) {
    var from = borrowFrom.prototype;  // prototype object to borrow from
    var to = addTo.prototype;         // prototype object to extend

    for(m in from) {  // Loop through all properties of the prototye
        if (typeof from[m] != "function") continue; // ignore nonfunctions
        to[m] = from[m];  // borrow the method
    }
}
