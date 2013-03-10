// Determining whether strings are compared by value or reference is easy.
// We compare two clearly distinct strings that happen to contain the same
// characters. If they are compared by value they will be equal, but if they
// are compared by reference, they will not be equal:
var s1 = "hello";
var s2 = "hell" + "o";
if (s1 == s2) document.write("Strings compared by value");
