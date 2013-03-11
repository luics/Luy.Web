// This class isn't good for much on its own. But it does define a
// generic toString() method that may be of interest to other classes.
function GenericToString() {}
GenericToString.prototype.toString = function() {
    var props = [];
    for(var name in this) {
        if (!this.hasOwnProperty(name)) continue;
        var value = this[name];
        var s = name + ":" 
        switch(typeof value) {
        case 'function':
            s += "function";
            break;
        case 'object':
            if (value instanceof Array) s += "array"
            else s += value.toString();
            break;
        default:
            s += String(value);
            break;
        }
        props.push(s);
    }
    return "{" + props.join(", ") + "}";
}

// This mixin class defines an equals() method that can compare
// simple objects for equality.
function GenericEquals() {}
GenericEquals.prototype.equals = function(that) {
    if (this == that) return true;
    
    // this and that are equal only if this has all the properties of 
    // that and doesn't have any additional properties
    // Note that we don't do deep comparison.  Property values
    // must be === to each other.  So properties that refer to objects
    // must refer to the same object, not objects that are equals()
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
