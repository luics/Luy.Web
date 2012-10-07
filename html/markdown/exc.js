var md2html = require('./gfm').md2html;


md2html({
  srcPath:__dirname + '/hello.md',
  destPath:__dirname + '/tmp/hello.html',
  callback:function (html) {
    console.log(html);
  }
});

md2html({
  srcPath:__dirname + '/sample_content.html',
  destPath:__dirname + '/tmp/sample_content.html',
  callback:function (html) {
    console.log(html.length);
  }
});