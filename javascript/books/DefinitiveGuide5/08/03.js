// Return an array that holds the names of the enumerable properties of o
function getPropertyNames(/* object */o) {
    var r = [];
    for(name in o) r.push(name);
    return r;
}

// Copy the enumerable properties of the object from to the object to.
// If to is null, a new object is created.  The function returns to or the
// newly created object.
function copyProperties(/* object */ from, /* optional object */ to) {
    if (!to) to = {};
    for(p in from) to[p] = from[p];
    return to;
}

// Copy the enumerable properties of the object from to the object to,
// but only the ones that are not already defined by to.
// This is useful, for example, when from contains default values that
// we want to use if they are not already defined in to.
function copyUndefinedProperties(/* object */ from, /* object */ to) {
    for(p in from) {
        if (!p in to) to[p] = from[p];
    }
}
