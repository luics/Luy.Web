// 这段代码保存为文件increment.js

var add = require('./math').add;
exports.increment = function(val) {
    return add(val, 1);
};