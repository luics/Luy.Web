<?php include 'inc/_util.php'; ?>
<?php

//etag只是校验手段，可以配合cache-control使用
header('Cache-Control: max-age=0');//尽快过期
cacheEtag('adserv-trunk-1.1');

$C[C_TITLE] = 'etag';
?>
<?php include 'inc/_html.php'; ?>
