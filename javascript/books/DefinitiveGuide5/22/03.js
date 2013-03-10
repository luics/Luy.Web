/**
 * Find all <img> tags in the document that have a "ro:src"
 * attribute on them.  Use the value of this attribute as the URL of an 
 * image to be displayed when the mouse passes over the image, and set 
 * appropriate event handlers to create the rollover effect.
 * The ro: namespace prefix should be mapped to the URI
 * "http://www.davidflanagan.com/rollover"
 */
function initRollovers() {
    var images = document.getElementsByTagName("img");
    for(var i = 0; i < images.length; i++) {
        var image = images[i];
        var rolloverURL = image.getAttributeNS(initRollovers.xmlns, "src");
        if (rolloverURL) addRollover(image, rolloverURL);
    }
}
// This is a made-up namespace URI for our "ro:" namespace
initRollovers.xmlns = "http://www.davidflanagan.com/rollover";
