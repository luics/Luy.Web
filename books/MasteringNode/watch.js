var fs = require('fs');
fs.watch('.', function (event, filename) {
  console.log('[watch]', event, filename);
//  console.log('the current mtime is: ' + curr.mtime);
//  console.log('the previous mtime was: ' + prev.mtime);
});
fs.writeFile('./testFile.txt', "changed", function (err) {
  if (err) throw err;
  console.log("file write complete");   
}); 