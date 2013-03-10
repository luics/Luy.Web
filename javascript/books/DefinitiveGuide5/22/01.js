/**
 * Add a rollover effect to the specified image, by adding event
 * handlers to switch the image to the specified URL while the
 * mouse is over the image.
 *
 * If the image is specified as a string, search for an image with that
 * string as its id or name attribute.
 * 
 * This method sets the onmouseover and onmouseout event handler properties
 * of the specified image, overwriting and discarding any handlers previously
 * set on those properties.
 */
function addRollover(img, rolloverURL) {
    if (typeof img == "string") {  // If img is a string,
        var id = img;              // it is an id, not an image
        img = null;                // and we don't have an image yet.

        // First try looking the image up by id
        if (document.getElementById) img = document.getElementById(id);
        else if (document.all) img = document.all[id];

        // If not found by id, try looking the image up by name.
        if (!img) img = document.images[id];
        
        // If we couldn't find the image, do nothing and fail silently
        if (!img) return;
    }

    // If we found an element but it is not an <img> tag, we also fail
    if (img.tagName.toLowerCase() != "img") return;

    // Remember the original URL of the image
    var baseURL = img.src;

    // Preload the rollover image into the browser's cache
    (new Image()).src = rolloverURL;

    img.onmouseover = function() { img.src = rolloverURL; }
    img.onmouseout = function() { img.src = baseURL; }
}
