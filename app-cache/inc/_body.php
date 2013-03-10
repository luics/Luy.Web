<body>
  <h1><?php echo $C[C_TITLE]; ?></h1>
  <a href="/c">..Parent</a> <a href="external.php">External Link</a><br/>
  <div id="sta" style="border:0px solid #ddd;margin-top: 1em;;"></div>  
  <img height="48" alt="img" src="http://www.baidu.com/img/baidu_sylogo1.gif" /><br/>
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