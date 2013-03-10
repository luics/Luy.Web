/**
 * com/davidflanagan/Shapes.js: a module of classes representing shapes
 *
 * This module defines classes within the com.davidflanagan.shapes namespace
 * This module requires the com/davidflanagan/Class.js module
 **/
// First, check for the Class module
var com;  // Declare global symbol before testing for its presence
if (!com || !com.davidflanagan || !com.davidflanagan.Class)
    throw new Error("com/davidflanagan/Class.js has not been loaded");

// Import a symbol from that module
var define = com.davidflanagan.Class.define;

// We know from the test for the Class module that the com.davidflanagan
// namespace exists, so we don't have to create it here.  
// We just create our shapes namespace within it.
if (com.davidflanagan.shapes)
    throw new Error("com.davidflanagan.shapes namespace already exists");

// Create the namespace
com.davidflanagan.shapes = {};

// Now define classes storing their constructor functions in our namespace
com.davidflanagan.shapes.Circle = define({ /* class data here */ });
com.davidflanagan.shapes.Rectangle = define({ /* class data here */ });
com.davidflanagan.shapes.Triangle = define({ /* class data here */});
