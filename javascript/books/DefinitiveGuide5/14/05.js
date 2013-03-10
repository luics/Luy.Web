function submitQuery() {
    // This is what we want to ask the user.
    // Limited formatting is possible with underscores and newlines.
    var message = "\n\n\n\n" +
        "_________________________________________________\n\n" +
        "Please be aware that complex queries such as yours\n"     +
        "may require a minute or more of search time.\n"    +
        "_________________________________________________\n\n\n"   +
        "Click Ok to proceed or Cancel to abort";

    // Ask for confirmation, and abort if we don't get it.
    if (!confirm(message)) return; 

    /* The code to perform the query would go here */
}
