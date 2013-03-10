<?php 
// Tell the browser that we're sending a script
header("Content-Type: text/javascript");
// Get arguments from the URL
$func = $_GET["func"];       // The function to invoke in our js code
$filename = $_GET["url"];    // The file or URL to pass to the func
$lines = file($filename);    // Get the lines of the file
$text = implode("", $lines); // Concatenate into a string
// Escape quotes and newlines
$escaped = str_replace(array("'", "\"", "\n", "\r"), 
                       array("\\'", "\\\"", "\\n", "\\r"),
                       $text);
// Output everything as a single JavaScript function call
echo "$func('$escaped');"
?>
