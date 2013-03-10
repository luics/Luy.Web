// Here we create an object representing the date of Christmas, 2007
// The variable xmas contains a reference to the object, not the object itself
var xmas = new Date(2007, 11, 25);

// When we copy by reference, we get a new reference to the original object
var solstice = xmas;  // Both variables now refer to the same object value

// Here we change the object through our new reference to it
solstice.setDate(21);

// The change is visible through the original reference, as well
xmas.getDate();  // Returns 21, not the original value of 25

// The same is true when objects and arrays are passed to functions.
// The following function adds a value to each element of an array.
// A reference to the array is passed to the function, not a copy of the array.
// Therefore, the function can change the contents of the array through
// the reference, and those changes will be visible when the function returns.
function add_to_totals(totals, x)
{
    totals[0] = totals[0] + x;
    totals[1] = totals[1] + x;
    totals[2] = totals[2] + x;
}

// Finally, we'll examine comparison by reference.
// When we compare the two variables defined above, we find they are
// equal, because they refer to the same object, even though we were trying
// to make them refer to different dates:
(xmas == solstice)  // Evaluates to true

// The two variables defined next refer to two distinct objects, both
// of which represent exactly the same date.
var xmas = new Date(2007, 11, 25);
var solstice_plus_4 = new Date(2007, 11, 25);

// But, by the rules of "compare by reference," distinct objects are not equal!
(xmas != solstice_plus_4)  // Evaluates to true
