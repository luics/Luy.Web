// Pass each element of the array a to the specified predicate function.
// Return an array that holds the elements for which the predicate
// returned true
function filterArray(/* array */ a, /* boolean function */ predicate) {
    var results = [];
    var length = a.length;  // In case predicate changes the length!
    for(var i = 0; i < length; i++) {
        var element = a[i];
        if (predicate(element)) results.push(element);
    }
    return results;
}

// Return the array of values that result when each of the elements
// of the array a are passed to the function f
function mapArray(/* array */a, /* function */ f) {
    var r = [];             // to hold the results
    var length = a.length;  // In case f changes the length!
    for(var i = 0; i < length; i++) r[i] = f(a[i]);
    return r;
}
