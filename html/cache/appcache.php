<?php include 'inc/_util.php'; ?>
<?php
$cacheControl = 'cache-control:no-cache, max-age=0';
header($cacheControl);

$C[C_TITLE] = 'appcache';
?>
<!DOCTYPE html>
<html manifest="ads.appcache">
  <?php include 'inc/_head.php'; ?>
  <?php include 'inc/_body.php'; ?>
</html>