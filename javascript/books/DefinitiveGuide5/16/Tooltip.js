/**
 * Tooltip.js: simple CSS tooltips with drop shadows.
 * 
 * This module defines a Tooltip class. Create a Tooltip object with the 
 * Tooltip() constructor.  Then make it visible with the show() method.
 * When done, hide it with the hide() method.
 *
 * Note that this module must be used with appropriate CSS class definitions
 * to display correctly.  The following are examples.
 * 
 *   .tooltipShadow {
 *      background: url(shadow.png);  /* translucent shadow * /
 *   }
 *
 *   .tooltipContent {
 *      left: -4px; top: -4px;        /* how much of the shadow shows * /
 *      background-color: #ff0;       /* yellow background * /
 *      border: solid black 1px;      /* thin black border * /
 *      padding: 5px;                 /* spacing between text and border * /
 *      font: bold 10pt sans-serif;   /* small bold font * /
 *   }
 *
 * In browsers that support translucent PNG images, it is possible to display
 * translucent drop shadows. Other browsers must use a solid color or 
 * simulate transparency with a dithered GIF image that alternates solid and
 * transparent pixels.
 */
function Tooltip() {  // The constructor function for the Tooltip class
    this.tooltip = document.createElement("div"); // create div for shadow
    this.tooltip.style.position = "absolute";     // absolutely positioned
    this.tooltip.style.visibility = "hidden";     // starts off hidden
    this.tooltip.className = "tooltipShadow";     // so we can style it

    this.content = document.createElement("div"); // create div for content
    this.content.style.position = "relative";     // relatively positioned
    this.content.className = "tooltipContent";    // so we can style it

    this.tooltip.appendChild(this.content);       // add content to shadow
}

// Set the content and position of the tooltip and display it
Tooltip.prototype.show = function(text, x, y) {
    this.content.innerHTML = text;             // Set the text of the tooltip.
    this.tooltip.style.left = x + "px";        // Set the position.
    this.tooltip.style.top = y + "px";
    this.tooltip.style.visibility = "visible"; // Make it visible.

    // Add the tooltip to the document if it has not been added before
    if (this.tooltip.parentNode != document.body)
        document.body.appendChild(this.tooltip);
};

// Hide the tooltip
Tooltip.prototype.hide = function() {
    this.tooltip.style.visibility = "hidden";  // Make it invisible.
};
