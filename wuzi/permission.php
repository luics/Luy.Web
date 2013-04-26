<?php
 //permission control
 //echo 'token: '.$_COOKIE['token'];
 if($_COOKIE['token'] != 'tianmao-wuzihuzhu'){
    die('403 - not forbidden');
 }
?>