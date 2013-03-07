var fs = require('fs');

var TPL = fs.readFileSync(__dirname + '/tpl.html', 'utf-8'),
  TPL_MARKDOWN = '{{MARKDOWN}}';

/**
 * Generate html file for markdown file.
 *
 * @param {object} option
 *   {string} option.srcPath, required
 *   {string} option.destPath, optional
 *   {function} option.callback, optional
 *   {string} option.lib, optional node lib("github-flavored-markdown", "markdown"), default is "github-flavored-markdown"
 *   {string} option.encoding, optional, default is "utf-8"
 */
exports.md2html = function (option) {
  if (!option.srcPath) {
    throw new Error('srcPath & callback should not be empty');
  }
  var srcPath = option.srcPath,
    destPath = option.destPath || srcPath + '-' + (+new Date) + '.html',
    callback = option.callback || null,
    encoding = option.encoding || 'utf-8',
    lib = option.lib || 'github-flavored-markdown';

  // Read from srcPath
  fs.readFile(srcPath, encoding, function (err, mdtext) {
    if (err) throw err;
    var html;

    // Markdown text 2 html
    if ('github-flavored-markdown' === lib) {
      html = require(lib).parse(mdtext, "isaacs/npm");
    } else if ('markdown' === lib) {
      html = require(lib).markdown.toHTML(mdtext);
    } else {
      throw new Error(lib + ' not supported now!');
    }

    // Template Replace
    html = TPL.replace(TPL_MARKDOWN, html);

    // Write 2 destPath
    fs.writeFile(destPath, html, encoding, function (err) {
      if (err) throw err;
      if (callback) callback(html);
    });
  });
}
