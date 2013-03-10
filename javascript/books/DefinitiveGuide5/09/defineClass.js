/**
 * defineClass() -- a utility function for defining JavaScript classes.
 *
 * This function expects a single object as its only argument.  It defines
 * a new JavaScript class based on the data in that object and returns the
 * constructor function of the new class.  This function handles the repetitive
 * tasks of defining classes: setting up the prototype object for correct
 * inheritance, copying methods from other types, and so on.
 * 
 * The object passed as an argument should have some or all of the
 * following properties:
 *
 *      name: the name of the class being defined.
 *            If specified, this value will be stored in the classname
 *            property of the prototype object.
 * 
 *    extend: The constructor of the class to be extended.  If omitted,
 *            the Object() constructor will be used.  This value will
 *            be stored in the superclass property of the prototype object.
 *
 * construct: The constructor function for the class. If omitted, a new
 *            empty function will be used.  This value becomes the return
 *            value of the function, and is also stored in the constructor
 *            property of the prototype object.
 *
 *   methods: An object that specifies the instance methods (and other shared
 *            properties) for the class.  The properties of this object are
 *            copied into the prototype object of the class.  If omitted,
 *            an empty object is used instead.  Properties named
 *            "classname", "superclass", and "constructor" are reserved
 *            and should not be used in this object.
 *
 *   statics: An object that specifies the static methods (and other static
 *            properties) for the class.  The properties of this object become
 *            properties of the constructor function.  If omitted, an empty
 *            object is used instead.
 *
 *   borrows: A constructor function or array of constructor functions.
 *            The instance methods of each of the specified classes are copied
 *            into the prototype object of this new class so that the 
 *            new class borrows the methods of each specified class.
 *            Constructors are processed in the order they are specified,
 *            so the methods of a class listed at the end of the array may
 *            overwrite the methods of those specified earlier. Note that
 *            borrowed methods are stored in the prototype object before
 *            the properties of the methods object above.  Therefore,
 *            methods specified in the methods object can overwrite borrowed
 *            methods. If this property is not specified, no methods are
 *            borrowed.
 *
 *  provides: A constructor function or array of constructor functions.
 *            After the prototype object is fully initialized, this function
 *            verifies that the prototype includes methods whose names and
 *            number of arguments match the instance methods defined by each
 *            of these classes.  No methods are copied; this is simply an
 *            assertion that this class "provides" the functionality of the
 *            specified classes.  If the assertion fails, this method will
 *            throw an exception.  If no exception is thrown, any
 *            instance of the new class can also be considered (using "duck
 *            typing") to be an instance of these other types.  If this
 *            property is not specified, no such verification is performed.
 **/
function defineClass(data) {
    // Extract the fields we'll use from the argument object.
    // Set up default values.
    var classname = data.name;
    var superclass = data.extend || Object;
    var constructor = data.construct || function() {};
    var methods = data.methods || {};
    var statics = data.statics || {};
    var borrows;
    var provides;

    // Borrows may be a single constructor or an array of them.
    if (!data.borrows) borrows = [];
    else if (data.borrows instanceof Array) borrows = data.borrows;
    else borrows = [ data.borrows ];

    // Ditto for the provides property.
    if (!data.provides) provides = [];
    else if (data.provides instanceof Array) provides = data.provides;
    else provides = [ data.provides ];

    // Create the object that will become the prototype for our class.
    var proto = new superclass();

    // Delete any noninherited properties of this new prototype object.
    for(var p in proto) 
        if (proto.hasOwnProperty(p)) delete proto[p];

    // Borrow methods from "mixin" classes by copying to our prototype.
    for(var i = 0; i < borrows.length; i++) {
        var c = data.borrows[i];
        borrows[i] = c;
        // Copy method properties from prototype of c to our prototype
        for(var p in c.prototype) {
            if (typeof c.prototype[p] != "function") continue;
            proto[p] = c.prototype[p];
        }
    }

    // Copy instance methods to the prototype object
    // This may overwrite methods of the mixin classes
    for(var p in methods) proto[p] = methods[p];

    // Set up the reserved "constructor", "superclass", and "classname"
    // properties of the prototype.
    proto.constructor = constructor;
    proto.superclass = superclass;
    // classname is set only if a name was actually specified.
    if (classname) proto.classname = classname;

    // Verify that our prototype provides all of the methods it is supposed to.
    for(var i = 0; i < provides.length; i++) {  // for each class
        var c = provides[i];
        for(var p in c.prototype) {   // for each property
            if (typeof c.prototype[p] != "function") continue;  // methods only
            if (p == "constructor" || p == "superclass") continue;
            // Check that we have a method with the same name and that
            // it has the same number of declared arguments.  If so, move on
            if (p in proto &&
                typeof proto[p] == "function" &&
                proto[p].length == c.prototype[p].length) continue;
            // Otherwise, throw an exception
            throw new Error("Class " + classname + " does not provide method "+
                            c.classname + "." + p);
        }
    }

    // Associate the prototype object with the constructor function
    constructor.prototype = proto;

    // Copy static properties to the constructor
    for(var p in statics) constructor[p] = data.statics[p];

    // Finally, return the constructor function
    return constructor;
}
