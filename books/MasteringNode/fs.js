var fs = require('fs');
fs.mkdir('./helloDir',0777, function (err) {
  if (err) throw err;
  fs.writeFile('./helloDir/message.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('file created with contents:');
    fs.readFile('./helloDir/message.txt','UTF-8' ,function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  });
});