// Return a standalone function that invokes the function f as a method of
// the object o.  This is useful when you need to pass a method to a function.
// If you don't bind it to its object, the association will be lost and
// the method you passed will be invoked as a regular function.
function bindMethod(/* object */ o, /* function */ f) {
    return function() { return f.apply(o, arguments) }
}

// Return a function that invokes the function f with the
// specified arguments and also any additional arguments that are
// passed to the returned function. (This is sometimes called "currying".)
function bindArguments(/* function */ f /*, initial arguments... */) {
    var boundArgs = arguments;
    return function() {
        // Build up an array of arguments.  It starts with the previously
        // bound arguments and is extended with the arguments passed now
        var args = [];
        for(var i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
        for(var i = 0; i < arguments.length; i++) args.push(arguments[i]);
        
        // Now invoke the function with these arguments
        return f.apply(this, args);
    }
}
