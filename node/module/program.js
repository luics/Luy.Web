// 这段代码保存为文件program.js

var inc = require('./increment').increment;
var a = 1;
inc(a); // 2

console.log('a=', inc(a));