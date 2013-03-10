/**
 * ImageLoop.js: An ImageLoop class for performing image animations
 *
 * Constructor Arguments: 
 *   imageId:   the id of the <img> tag which will be animated
 *   fps:       the number of frames to display per second
 *   frameURLs: an array of URLs, one for each frame of the animation
 *
 * Public Methods: 
 *   start():   start the animation (but wait for all frames to load first)
 *   stop():    stop the animation
 * 
 * Public Properties:
 *   loaded:    true if all frames of the animation have loaded,
 *              false otherwise
 */
function ImageLoop(imageId, fps, frameURLs) {
    // Remember the image id. Don't look it up yet since this constructor
    // may be called before the document is loaded.
    this.imageId = imageId;
    // Compute the time to wait between frames of the animation
    this.frameInterval = 1000/fps;
    // An array for holding Image objects for each frame
    this.frames = new Array(frameURLs.length);

    this.image = null;             // The <img> element, looked up by id
    this.loaded = false;           // Whether all frames have loaded
    this.loadedFrames = 0;         // How many frames have loaded
    this.startOnLoad = false;      // Start animating when done loading?
    this.frameNumber = -1;         // What frame is currently displayed
    this.timer = null;             // The return value of setInterval()

    // Initialize the frames[] array and preload the images
    for(var i = 0; i < frameURLs.length; i++) {
        this.frames[i] = new Image();      // Create Image object
        // Register an event handler so we know when the frame is loaded
        this.frames[i].onload = countLoadedFrames; // defined later
        this.frames[i].src = frameURLs[i]; // Preload the frame's image
    }

    // This nested function is an event handler that counts how many 
    // frames have finished loading.  When all are loaded, it sets a flag,
    // and starts the animation if it has been requested to do so.
    var loop = this;
    function countLoadedFrames() {
        loop.loadedFrames++;
        if (loop.loadedFrames == loop.frames.length) {
            loop.loaded = true;
            if (loop.startOnLoad) loop.start();
        }
    }

    // Here we define a function that displays the next frame of the
    // animation.  This function can't be an ordinary instance method because
    // setInterval() can only invoke functions, not methods.  So we make
    // it a closure that includes a reference to the ImageLoop object
    this._displayNextFrame = function() {
        // First, increment the frame number. The modulo operator (%) means
        // that we loop from the last to the first frame
        loop.frameNumber = (loop.frameNumber+1)%loop.frames.length;
        // Update the src property of the image to the URL of the new frame
        loop.image.src = loop.frames[loop.frameNumber].src;
    };
}

/**
 * This method starts an ImageLoop animation.  If the frame images have not
 * finished loading, it instead sets a flag so that the animation will 
 * automatically be started when loading completes
 */
ImageLoop.prototype.start = function() {
    if (this.timer != null) return;   // Already started
    // If loading is not complete, set a flag to start when it is
    if (!this.loaded) this.startOnLoad = true;
    else {
        // If we haven't looked up the image by id yet, do so now
        if (!this.image) this.image = document.getElementById(this.imageId);
        // Display the first frame immediately
        this._displayNextFrame();
        // And set a timer to display subsequent frames
        this.timer = setInterval(this._displayNextFrame, this.frameInterval);
    }
};

/** Stop an ImageLoop animation */
ImageLoop.prototype.stop = function() {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
};
