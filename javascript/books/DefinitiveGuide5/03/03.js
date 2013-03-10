// This is another version of the add_to_totals() function. It doesn't
// work, though, because instead of changing the array itself, it tries to
// change the reference to the array.
function add_to_totals2(totals, x)
{
    newtotals = new Array(3);
    newtotals[0] = totals[0] + x;
    newtotals[1] = totals[1] + x;
    newtotals[2] = totals[2] + x;
    totals = newtotals;  // This line has no effect outside of the function
}
