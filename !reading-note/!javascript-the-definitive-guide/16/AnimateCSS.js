/**
 * AnimateCSS.js:
 * This file defines a function named animateCSS(), which serves as a framework
 * for creating CSS-based animations. The arguments to this function are:
 *
 *     element: The HTML element to be animated.
 *     numFrames: The total number of frames in the animation.
 *     timePerFrame: The number of milliseconds to display each frame.
 *     animation: An object that defines the animation; described below.
 *     whendone: An optional function to call when the animation finishes.
 *               If specified, this function is passed element as its argument.
 *
 * The animateCSS() function simply defines an animation framework. It is
 * the properties of the animation object that specify the animation to be
 * done. Each property should have the same name as a CSS style property. The
 * value of each property must be a function that returns values for that
 * style property.  Each function is passed the frame number and the total
 * amount of elapsed time, and it can use these to compute the style value it
 * should return for that frame.  For example, to animate an image so that it
 * slides in from the upper left, you might invoke animateCSS as follows:
 *
 *  animateCSS(image, 25, 50,  // Animate image for 25 frames of 50ms each
 *             {  // Set top and left attributes for each frame as follows:
 *               top: function(frame,time) { return frame*8 + "px"; },
 *               left: function(frame,time) { return frame*8 + "px"; }
 *             });
 *             
 **/
function animateCSS(element, numFrames, timePerFrame, animation, whendone) {
    var frame = 0;  // Store current frame number
    var time = 0;   // Store total elapsed time

    // Arrange to call displayNextFrame() every timePerFrame milliseconds.
    // This will display each of the frames of the animation.
    var intervalId = setInterval(displayNextFrame, timePerFrame);

    // The call to animateCSS() returns now, but the previous line ensures that
   // the following nested function will be invoked once for each frame
    // of the animation.
    function displayNextFrame() {
        if (frame >= numFrames) {             // First, see if we're done
            clearInterval(intervalId);        // If so, stop calling ourselves
            if (whendone) whendone(element);  // Invoke whendone function
            return;                           // And we're finished
        }

        // Now loop through all properties defined in the animation object
        for(var cssprop in animation) {
            // For each property, call its animation function, passing the
            // frame number and the elapsed time. Use the return value of the
            // function as the new value of the corresponding style property
            // of the specified element. Use try/catch to ignore any
            // exceptions caused by bad return values.
            try {
                element.style[cssprop] = animation[cssprop](frame, time);
            } catch(e) {}
        }

        frame++;               // Increment the frame number
        time += timePerFrame;  // Increment the elapsed time
    }
}
