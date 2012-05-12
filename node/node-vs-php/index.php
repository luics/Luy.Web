<?php
function toLog(){
  $file = fopen('log/index.php.log', 'a');
  list($usec, $sec) = explode(" ", microtime(true));
  $msec=round($usec*1000 + $sec);
  fwrite($file, $msec);
  fwrite($file, "\r\n");
  fclose($file);
}

function addPost($m){
  $conn = mysql_connect('localhost', 'root', '123456');
  if (!$conn) {
      die('Could not connect: ' . mysql_error());
  }
  //mysql_query("SET NAMES utf-8");
  mysql_query("USE mblog");
  //$result = mysql_query("SELECT COUNT(*) FROM post");
  //var_dump($result);

  $sql = sprintf('INSERT INTO post(msg,user) VALUES(\'%s\',1)', $m);
  //echo $sql;
  mysql_query($sql);
}

toLog();
addPost($_GET['m']);

?>target-php