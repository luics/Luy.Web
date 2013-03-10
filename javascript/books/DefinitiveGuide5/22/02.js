/**
 * Find all <img> tags in the document that have a "rollover"
 * attribute on them.  Use the value of this attribute as the URL of an 
 * image to be displayed when the mouse passes over the image and set 
 * appropriate event handlers to create the rollover effect.
 */
function initRollovers() {
    var images = document.getElementsByTagName("img");
    for(var i = 0; i < images.length; i++) {
        var image = images[i];
        var rolloverURL = image.getAttribute("rollover");
        if (rolloverURL) addRollover(image, rolloverURL);
    }
}
