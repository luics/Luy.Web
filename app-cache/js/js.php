<?php
$cacheControl = 'cache-control: no-cache, max-age=0'; //[debug] always not to cache this page
header($cacheControl);
?>
log('from js.php', 2);
