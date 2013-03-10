// A Comparable class with an abstract method
// so that we can define classes that "provide" Comparable.
var Comparable = defineClass({
    name: "Comparable",
    methods: { compareTo: function(that) { throw "abstract"; } }
});

// A mixin class with a usefully generic equals() method for borrowing
var GenericEquals = defineClass({
    name: "GenericEquals",
    methods: {
        equals: function(that) {
            if (this == that) return true;
            var propsInThat = 0; 
            for(var name in that) {
                propsInThat++;
                if (this[name] !== that[name]) return false;
            }

            // Now make sure that this object doesn't have additional props
            var propsInThis = 0;
            for(name in this) propsInThis++;

            // If this has additional properties then they are not equal
            if (propsInThis != propsInThat) return false;

            // The two objects appear to be equal.
            return true;
        }
    }
});


// A very simple Rectangle class that provides Comparable
var Rectangle = defineClass({
    name: "Rectangle",
    construct: function(w,h) { this.width = w; this.height = h; },
    methods: {
        area: function() { return this.width * this.height; },
        compareTo: function(that) { return this.area() - that.area(); }
    },
    provides: Comparable
});


// A subclass of Rectangle that chains to its superclass constructor,
// inherits methods from its superclass, defines an instance method and
// a static method of its own, and borrows an equals() method.
var PositionedRectangle = defineClass({
    name: "PositionedRectangle",
    extend: Rectangle,
    construct: function(x,y,w,h) {
        this.superclass(w,h);  // chain to superclass
        this.x = x;
        this.y = y;
    },
    methods: {
        isInside: function(x,y) {
            return x > this.x && x < this.x+this.width &&
                y > this.y && y < this.y+this.height;
        }
    },
    statics: {
        comparator: function(a,b) { return a.compareTo(b); }
    },
    borrows: [GenericEquals]
});
