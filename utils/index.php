<!DOCTYPE html>
<html id="home" lang="en">
  <head>
    <meta charset=utf-8 />
    <meta name="viewport" content="width=620" />
    <title>Luy's Web Utils</title>
    <link rel="stylesheet" href="css/util.css" />
    <script src="js/h5utils.js"></script>
    <script src="js/modernizr.custom.js"></script>
  </head>
  <body>
    <section id="wrapper">
      <header>
        <h1><abbr>Luy's</abbr> Web Utils</h1>
      </header>
      <article>
        <div class="c"></div>

        <div class="con base64">
          <h3>Base64</h3>
          <textarea id="code"></textarea><br/>
          <input type="button" value="Decode" onclick="mylog(Base64.decode($('#code').value))" />
          <input type="button" value="Encode" onclick="mylog(Base64.encode($('#code').value))" />
          <div id="status" class="prev"></div>
        </div>


        <div class="con asc">
          <h3>ASCII</h3>
          <div id="asc"></div>
        </div>

        <div class="con">
          <h3>Other Util</h3>
          ..
        </div>

        <div class="c"></div><br/>
      </article>
      <a id="html5badge" href="http://www.w3.org/html/logo/">
        <img src="images/html5-badge-h-connectivity-device-graphics-multimedia-performance-semantics-storage.png" width="325" height="64" alt="HTML5 Powered with Connectivity / Realtime, Device Access, Graphics, 3D &amp; Effects, Multimedia, Performance &amp; Integration, Semantics, and Offline &amp; Storage" title="HTML5 Powered with Connectivity / Realtime, Device Access, Graphics, 3D &amp; Effects, Multimedia, Performance &amp; Integration, Semantics, and Offline &amp; Storage">
      </a>
      <footer><a href="mailto:luics.king@gmail.com">luics.king@gmail.com</a></footer>
    </section>
<!--    <a href="http://github.com/luics"><img style="position: absolute; top: 0; left: 0; border: 0;" src="http://s3.amazonaws.com/github/ribbons/forkme_left_darkblue_121621.png" alt="Fork me on GitHub" /></a>-->

    <script src="js/extension.js"></script>
    <script src="js/util.js"></script>
  </body>
</html>