<?php include 'inc/_util.php'; ?>
<?php

#$cacheControl = 'cache-control: max-age=8'; //用于验证max-age，可实现离线app
$cacheControl = 'cache-control: max-age=800'; //用于验证url key
header($cacheControl);

$C[C_TITLE] = 'max-age';
?>
<?php include 'inc/_html.php'; ?>