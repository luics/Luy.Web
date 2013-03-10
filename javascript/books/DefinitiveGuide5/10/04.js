// Create the namespace object.  Error checking omitted here for brevity.
var com;
if (!com) com = {};
if (!com.davidflanagan) com.davidflanagan = {};
com.davidflanagan.Class = {};

// Don't stick anything into the namespace directly.
// Instead we define and invoke an anonymous function to create a closure
// that serves as our private namespace.  This function will export its 
// public symbols from the closure into the com.davidflanagan.Class object
// Note that we use an unnamed function so we don't create any other 
// global symbols
(function() {  // Begin anonymous function definition
    // Nested functions create symbols within the closure
    function define(data) { counter++; /* more code here */ }
    function provides(o, c) { /* code here */ } 

    // Local variable are symbols within the closure.
    // This one will remain private within the closure
    var counter = 0;

    // This function can refer to the variable with a simple name
    // instead of having to qualify it with a namespace
    function getCounter() { return counter; }

    // Now that we've defined the properties we want in our private
    // closure, we can export the public ones to the public namespace
    // and leave the private ones hidden here.
    var ns = com.davidflanagan.Class;
    ns.define = define;
    ns.provides = provides;
    ns.getCounter = getCounter;
})();          // End anonymous function definition and invoke it
