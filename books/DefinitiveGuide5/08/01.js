// A shortcut function, sometimes useful instead of document.write()
// This function has no return statement, so it returns undefined.
function print(msg) {
    document.write(msg, "<br>");
}

// A function that computes and returns the distance between two points
function distance(x1, y1, x2, y2) {
    var dx = x2 - x1;
    var dy = y2 - y1;
    return Math.sqrt(dx*dx + dy*dy);
}

// A recursive function (one that calls itself) that computes factorials
// Recall that x! is the product of x and all positive integers less than it
function factorial(x) {
    if (x <= 1)
        return 1;
    return x * factorial(x-1);
}
