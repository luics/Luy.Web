/*
 * Complex.js:
 * This file defines a Complex class to represent complex numbers.
 * Recall that a complex number is the sum of a real number and an
 * imaginary number and that the imaginary number i is the
 * square root of -1.
 */

/*
 * The first step in defining a class is defining the constructor
 * function of the class. This constructor should initialize any
 * instance properties of the object. These are the essential
 * "state variables" that make each instance of the class different.
 */
function Complex(real, imaginary) {
    this.x = real;       // The real part of the number
    this.y = imaginary;  // The imaginary part of the number
}

/*
 * The second step in defining a class is defining its instance
 * methods (and possibly other properties) in the prototype object
 * of the constructor. Any properties defined in this object will
 * be inherited by all instances of the class. Note that instance
 * methods operate implicitly on the this keyword. For many methods,
 * no other arguments are needed.
 */

// Return the magnitude of a complex number. This is defined
// as its distance from the origin (0,0) of the complex plane.
Complex.prototype.magnitude = function() {
    return Math.sqrt(this.x*this.x + this.y*this.y);
};

// Return a complex number that is the negative of this one.
Complex.prototype.negative = function() {
    return new Complex(-this.x, -this.y);
};

// Add a complex number to this one and return the sum in a new object.
Complex.prototype.add = function(that) {
    return new Complex(this.x + that.x, this.y + that.y);
}

// Multiply this complex number by another and return the product as a
// new Complex object.
Complex.prototype.multiply = function(that) {
    return new Complex(this.x * that.x - this.y * that.y,
                       this.x * that.y + this.y * that.x);
}

// Convert a Complex object to a string in a useful way.
// This is invoked when a Complex object is used as a string.
Complex.prototype.toString = function() {
    return "{" + this.x + "," + this.y + "}";
};

// Test whether this Complex object has the same value as another.
Complex.prototype.equals = function(that) {
    return this.x == that.x && this.y == that.y;
}

// Return the real portion of a complex number. This function
// is invoked when a Complex object is treated as a primitive value.
Complex.prototype.valueOf = function() { return this.x; }

/*
 * The third step in defining a class is to define class methods,
 * constants, and any needed class properties as properties of the
 * constructor function itself (instead of as properties of the
 * prototype object of the constructor). Note that class methods
 * do not use the this keyword: they operate only on their arguments.
 */
// Add two complex numbers and return the result.
// Contrast this with the instance method add()
Complex.sum = function (a, b) {
    return new Complex(a.x + b.x, a.y + b.y);
};

// Multiply two complex numbers and return the product.
// Contrast with the instance method multiply()
Complex.product = function(a, b) {
    return new Complex(a.x * b.x - a.y * b.y,
                       a.x * b.y + a.y * b.x);
};

// Here are some useful predefined complex numbers.
// They are defined as class properties, and their names are in uppercase
// to indicate that they are intended to be constants (although it is not
// possible to make JavaScript properties read-only).
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);
