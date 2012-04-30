<?php
$cacheControl = 'cache-control: max-age=60';
#$cacheControl = 'cache-control: public';
header($cacheControl);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no" />
    <title>Cache</title>
  </head>
  <body>
    <h1>Cache</h1>
    2<br/> 
    <a href="http://www.baidu.com">External Link</a><br/>
    <div id="sta" style="border:1px solid red;margin-top: 1em;min-height: 2em;"></div>  
    <script>
      function $(sid){
        return document.getElementById(sid);
      }

      function log(){
        var msg = [];
        for(var i=0; i<arguments.length; ++i){
          msg.push(arguments[i], ' ');
        }
        $('sta').innerHTML += (msg.join('') + '<br/>')
      }
    </script>
  </body>
</html>
