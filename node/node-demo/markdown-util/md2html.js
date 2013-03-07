var markdownTemplate = require('markdown-util');

var githubTpl = markdownTemplate({
  tplStyle:'github'
});

githubTpl({
  srcPath:__dirname + '/hello.md',
  destPath:__dirname + '/hello-github.html',
  title:"Markdown Cheat Sheet",
  css: "body{padding:0 10px;}",
  callback:function (html) {
    console.log('[done]', html.length, '\n', html.substr(0, 195));
  }
});

githubTpl({
  srcPath:__dirname + '/mail.md',
  destPath:__dirname + '/mail-github.html',
  title:"Demo Mail",
  css: "body{padding:0 10px;}"
});