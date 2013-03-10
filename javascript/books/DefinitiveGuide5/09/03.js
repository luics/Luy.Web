// Here is a simple Rectangle class.
// It has a width and height and can compute its own area
function Rectangle(w, h) {
    this.width = w;
    this.height = h;
}
Rectangle.prototype.area = function() { return this.width * this.height; }

// Here is how we might subclass it 

function PositionedRectangle(x, y, w, h) {
    // First, invoke the superclass constructor on the new object
    // so that it can initialize the width and height.
    // We use the call method so that we invoke the constructor as a
    // method of the object to be initialized. 
    // This is called constructor chaining.
    Rectangle.call(this, w, h);

    // Now store the position of the upper-left corner of the rectangle
    this.x = x;
    this.y = y;
}

// If we use the default prototype object that is created when we
// define the PositionedRectangle() constructor, we'd get a subclass of Object.
// To subclass, rectangle, we must explicitly create our prototype object.
PositionedRectangle.prototype = new Rectangle();

// We create this prototype object for inheritance purposes, but we
// don't actually want to inherit the width and height properties that
// each Rectangle object has, so delete them from the prototype.
delete PositionedRectangle.prototype.width;
delete PositionedRectangle.prototype.height;

// Since the prototype object was created with the Rectangle() constructor,
// it has a constructor property that refers to that constructor.  But
// we want PositionedRectangle objects to have a different constructor
// property, so we've got to reassign this default constructor property.
PositionedRectangle.prototype.constructor = PositionedRectangle;

// Now that we've configured the prototype object for our subclass,
// we can add instance methods to it.
PositionedRectangle.prototype.contains = function(x,y) {
    return (x > this.x && x < this.x + this.width &&
            y > this.y && y < this.y + this.height);
}
