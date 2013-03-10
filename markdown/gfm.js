var ghm = require("github-flavored-markdown"),
  fs = require('fs');

/**
 * Generate html file for markdown file.
 *
 * @param {object} option
 *   {string} option.srcPath, required
 *   {string} option.destPath, optional
 *   {function} option.callback, optional
 *   {string} option.encoding, optional, default is utf-8
 */
exports.md2html = function (option) {
  if (!option.srcPath) {
    throw new Error('srcPath & callback should not be empty');
  }
  var srcPath = option.srcPath,
    destPath = option.destPath || srcPath + '-' + (+new Date) + '.html',
    callback = option.callback || null,
    encoding = option.encoding || 'utf-8';

  fs.readFile(srcPath, encoding, function (err, md) {
    if (err) throw err;
    //console.log(md);
    var html = ghm.parse(md, "isaacs/npm");
    fs.writeFile(destPath, html, encoding, function (err) {
      if (err) throw err;
      if (callback) callback(html);
    });
  });
}
