function getSelectedText() {
    if (window.getSelection) {
        // This technique is the most likely to be standardized.
        // getSelection() returns a Selection object, which we do not document.
        return window.getSelection().toString();
    }
    else if (document.getSelection) {
        // This is an older, simpler technique that returns a string
        return document.getSelection();
    }
    else if (document.selection) {
        // This is the IE-specific technique.
        // We do not document the IE selection property or TextRange objects.
        return document.selection.createRange().text;
    }
}
