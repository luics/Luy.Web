function getType(x) {
    // If x is null, return "null"
    if (x == null) return "null";

    // Next try the typeof operator
    var t = typeof x;
    // If the result is not vague, return it
    if (t != "object")  return t;

    // Otherwise, x is an object. Use the default toString() method to
    // get the class value of the object.
    var c = Object.prototype.toString.apply(x);  // Returns "[object class]"
    c = c.substring(8, c.length-1);              // Strip off "[object" and "]"

    // If the class is not a vague one, return it.
    if (c != "Object") return c;

    // If we get here, c is "Object".  Check to see if
    // the value x is really just a generic object.
    if (x.constructor == Object) return c;  // Okay the type really is "Object"

    // For user-defined classes, look for a string-valued property named
    // classname, that is inherited from the object's prototype
    if ("classname" in x.constructor.prototype &&  // inherits classname
        typeof x.constructor.prototype.classname == "string") // its a string
        return x.constructor.prototype.classname;

    // If we really can't figure it out say so.
    return "<unknown type>";
}
