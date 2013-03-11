// Create the global symbol "com" if it doesn't exist
// Throw an error if it does exist but is not an object
var com;
if (!com) com = {};
else if (typeof com != "object")
    throw new Error("com already exists and is not an object");

// Repeat the creation and type-checking code for the next level
if (!com.davidflanagan) com.davidflanagan = {}  
else if (typeof com.davidflanagan != "object")
    throw new Error("com.davidflanagan already exists and is not an object");

// Throw an error if com.davidflanagan.Class already exists
if (com.davidflanagan.Class)
    throw new Error("com.davidflanagan.Class already exists");

// Otherwise, create and populate the namespace with one big object literal
com.davidflanagan.Class = {
    define: function(data) { /* code here */ },
    provides: function(o, c) { /* code here */ }
};
