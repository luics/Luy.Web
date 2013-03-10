// The following values are used by the schedule() method below.
// They are used like constants but are writeable so that you can override
// these default values.
Tooltip.X_OFFSET = 25;  // Pixels to the right of the mouse pointer
Tooltip.Y_OFFSET = 15;  // Pixels below the mouse pointer
Tooltip.DELAY = 500;    // Milliseconds after mouseover

/**
 * This method schedules a tooltip to appear over the specified target
 * element Tooltip.DELAY milliseconds from now. The argument e should
 * be the event object of a mouseover event. This method extracts the
 * mouse coordinates from the event, converts them from window
 * coordinates to document coordinates, and adds the offsets above.
 * It determines the text to display in the tooltip by querying the
 * "tooltip" attribute of the target element. This method
 * automatically registers and unregisters an onmouseout event handler
 * to hide the tooltip or cancel its pending display.
 */
Tooltip.prototype.schedule = function(target, e) {
    // Get the text to display.  If none, we don't do anything
    var text = target.getAttribute("tooltip");
    if (!text) return;

    // The event object holds the mouse position in window coordinates
    // We convert these to document coordinates using the Geometry module
    var x = e.clientX + Geometry.getHorizontalScroll();
    var y = e.clientY + Geometry.getVerticalScroll();

    // Add the offsets so the tooltip doesn't appear right under the mouse
    x += Tooltip.X_OFFSET;
    y += Tooltip.Y_OFFSET;

    // Schedule the display of the tooltip
    var self = this;  // We need this for the nested functions below
    var timer = window.setTimeout(function() { self.show(text, x, y); },
                                  Tooltip.DELAY);

    // Also, register an onmouseout handler to hide a tooltip or cancel
    // the pending display of a tooltip.
    if (target.addEventListener) target.addEventListener("mouseout", mouseout,
                                                         false);
    else if (target.attachEvent) target.attachEvent("onmouseout", mouseout);
    else target.onmouseout = mouseout;

    // Here is the implementation of the event listener
    function mouseout() {
        self.hide();                // Hide the tooltip if it is displayed,
        window.clearTimeout(timer); // cancel any pending display,
        // and remove ourselves so we're called only once
        if (target.removeEventListener) 
            target.removeEventListener("mouseout", mouseout, false);
        else if (target.detachEvent) target.detachEvent("onmouseout",mouseout);
        else target.onmouseout = null;
    }
}

// Define a single global Tooltip object for general use
Tooltip.tooltip = new Tooltip();

/*
 * This static version of the schedule() method uses the global tooltip
 * Use it like this:
 * 
 *   <a href="www.davidflanagan.com" tooltip="good Java/JavaScript blog"
 *      onmouseover="Tooltip.schedule(this, event)">David Flanagan's blog</a>
 */
Tooltip.schedule = function(target, e) { Tooltip.tooltip.schedule(target, e); }
