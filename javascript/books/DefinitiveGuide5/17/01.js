// This function is suitable for use as an onclick event handler for <a> and
// <area> elements. It uses the this keyword to refer to the document element
// and may return false to prevent the browser from following the link.
function confirmLink() {
    return confirm("Do you really want to visit " + this.href + "?");
}

// This function loops through all the hyperlinks in a document and assigns
// the confirmLink function to each one as an event handler. Don't call it
// before the document is parsed and the links are all defined. It is best
// to call it from the onload event handler of a <body> tag.
function confirmAllLinks() {
    for(var i = 0; i < document.links.length; i++) {
        document.links[i].onclick = confirmLink;
    }
}
