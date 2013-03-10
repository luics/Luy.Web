/**
 * linkdetails.js
 * 
 * This unobtrusive JavaScript module adds event handlers to links in a 
 * document so that they display tooltips when the mouse hovers over them for
 * half a second.  If the link points to a document on the same server as this
 * the source document, the tooltip includes type, size, and date 
 * information obtained with an XMLHttpRequest HEAD request.
 * 
 * This module requires the Tooltip.js, HTTP.js, and Geometry.js modules
 */
(function() {  // Anonymous function to hold all our symbols
    // Create the tooltip object we'll use
    var tooltip = new Tooltip();

    // Arrange to have the init() function called on document load
    if (window.addEventListener) window.addEventListener("load", init, false);
    else if (window.attachEvent) window.attachEvent("onload", init);

    // To be called when the document loads
    function init() {  
        var links = document.getElementsByTagName('a');
        // Loop through all the links, adding event handlers to them
        for(var i = 0; i < links.length; i++) 
            if (links[i].href) addTooltipToLink(links[i]);
    }

    // This is the function that adds event handlers
    function addTooltipToLink(link) {
        // Add event handlers 
        if (link.addEventListener) {  // Standard technique
            link.addEventListener("mouseover", mouseover, false);
            link.addEventListener("mouseout", mouseout, false);
        }
        else if (link.attachEvent) {  // IE-specific technique
            link.attachEvent("onmouseover", mouseover);
            link.attachEvent("onmouseout", mouseout);
        }

        var timer; // Used with setTimeout/clearTimeout

        function mouseover(event) {
            var e = event || window.event;
            // Get mouse position, convert to document coordinates, add offset
            var x = e.clientX + Geometry.getHorizontalScroll() + 25;
            var y = e.clientY + Geometry.getVerticalScroll() + 15;

            // If a tooltip is pending, cancel it
            if (timer) window.clearTimeout(timer);

            // Schedule a tooltip to appear in half a second
            timer = window.setTimeout(showTooltip, 500);

            function showTooltip() {
                // If it is an HTTP link, and if it is from the same host
                // as this script is, we can use XMLHttpRequest
                // to get more information about it.
		if (link.protocol == "http:" && link.host == location.host) { 
                    // Make an XMLHttpRequest for the headers of the link
                    HTTP.getHeaders(link.href, function(headers) {
                        // Use the headers to build a string of text
                        var tip = "URL: " + link.href + "<br>" +
                            "Type: " + headers["Content-Type"] + "<br>" +
                            "Size: " + headers["Content-Length"] + "<br>" +
                            "Date: " + headers["Last-Modified"];
                        // And display it as a tooltip
                        tooltip.show(tip, x, y);
                    });

                }
                else {
                    // Otherwise, if it is an offsite link, the
                    // tooltip is just the URL of the link
                    tooltip.show("URL: " + link.href, x, y);
                }
            }
        }

        function mouseout(e) {
            // When the mouse leaves a link, clear any 
            // pending tooltips or hide it if it is shown
            if (timer) window.clearTimeout(timer);
            timer = null;
            tooltip.hide();
        }
    }
})();
