// We begin with the constructor
function Circle(radius) {
    // r is an instance property, defined and initialized in the constructor.
    this.r = radius;
}

// Circle.PI is a class property--it is a property of the constructor function.
Circle.PI = 3.14159;

// Here is an instance method that computes a circle's area.
Circle.prototype.area = function() { return Circle.PI * this.r * this.r; }

// This class method takes two Circle objects and returns the
// one that has the larger radius.
Circle.max = function(a,b) {
    if (a.r > b.r) return a;
    else return b;
}

// Here is some code that uses each of these fields:
var c = new Circle(1.0);      // Create an instance of the Circle class
c.r = 2.2;                    // Set the r instance property
var a = c.area();             // Invoke the area() instance method
var x = Math.exp(Circle.PI);  // Use the PI class property in our own computation
var d = new Circle(1.2);      // Create another Circle instance
var bigger = Circle.max(c,d); // Use the max() class method
