<?php

define("C_TITLE", "title");

function cacheEtag($etag) {
  if ($_SERVER['HTTP_IF_NONE_MATCH'] == $etag) {
    header('Etag:' . $etag, true, 304);
    exit;
  }
  else
    header('Etag:' . $etag);
}

function cacheLastModified($lastModified) {
  if ($_SERVER['HTTP_IF_MODIFIED_SINCE'] == $lastModified) {
    header('Last-Modified:' . $lastModified, true, 304);
    exit;
  }
  else
    header('Last-Modified:' . $lastModified);
}

function getHttpDate($time) {
  return gmdate("D, d M Y H:i:s", $time) . " GMT";
}

?>
