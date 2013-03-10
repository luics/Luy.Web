// Create a namespace for our SVG-related utilities
var SVG = {};

// These are SVG-related namespace URLs
SVG.ns = "http://www.w3.org/2000/svg";
SVG.xlinkns = "http://www.w3.org/1999/xlink";

// Create and return an empty <svg> element.
// Note that the element is not added to the document
// Note that we can specify the pixel size of the image as well as
// its internal coordinate system.
SVG.makeCanvas = function(id, pixelWidth, pixelHeight, userWidth, userHeight) {
    var svg = document.createElementNS(SVG.ns, "svg:svg");
    svg.setAttribute("id", id);
    // How big is the canvas in pixels
    svg.setAttribute("width", pixelWidth);
    svg.setAttribute("height", pixelHeight);
    // Set the coordinates used by drawings in the canvas
    svg.setAttribute("viewBox", "0 0 " + userWidth + " " + userHeight);
    // Define the XLink namespace that SVG uses
    svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink",
                       SVG.xlinkns);
    return svg;
};

// Serialize the canvas element to a string and use this string
// in a data: URL for display in an <object> tag. This allows SVG
// to work in browsers that support the data: URL scheme and have an SVG 
// plugin installed.
SVG.makeDataURL = function(canvas) {
    // We don't bother with the IE serialization technique since it
    // doesn't support data: URLs
    var text = (new XMLSerializer()).serializeToString(canvas);
    var encodedText = encodeURIComponent(text);
    return "data:image/svg+xml," + encodedText;
};

// Create an <object> to display an SVG drawing using a data: URL
SVG.makeObjectTag = function(canvas, width, height) {
    var object = document.createElement("object"); // Create HTML <object> tag
    object.width = width;                          // Set size of object
    object.height = height;
    object.data = SVG.makeDataURL(canvas);         // SVG image as data: URL
    object.type = "image/svg+xml"                  // SVG MIME type
    return object;
}
