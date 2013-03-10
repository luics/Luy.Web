<?php include 'inc/_util.php'; ?>
<?php

//last-modified只是校验手段，可以配合cache-control使用
header('cache-control: max-age=0');
cacheLastModified(getHttpDate(1328177162));

$C[C_TITLE] = 'last-modified';
?>
<?php include 'inc/_html.php'; ?>
