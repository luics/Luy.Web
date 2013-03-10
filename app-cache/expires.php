<?php include 'inc/_util.php'; ?>
<?php

//expires为客户端缓存失效验证手段，会被cache-control max-age覆盖
//页面中的baidu logo使用了10年后的时间作为expires

$C[C_TITLE] = 'expires';
?>
<?php include 'inc/_html.php'; ?>
