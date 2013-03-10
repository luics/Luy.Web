var md2html = require('./markdown').md2html;


md2html({
  srcPath:__dirname + '/hello.md',
  destPath:__dirname + '/hello.html',
//  lib:'markdown',
  callback:function (html) {
    console.log(html.length, html.substr(0, 100));
  }
});

//md2html({
//  srcPath:__dirname + '/sample_content.html',
//  destPath:__dirname + '/tmp/sample_content.html',
//  callback:function (html) {
//    console.log(html.length);
//  }
//});