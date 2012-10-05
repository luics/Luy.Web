var EventEmitter = require('events').EventEmitter,
  util = require('util');

var e = new EventEmitter();
e.setMaxListeners(1);

e.on('test', function(){

});
e.on('test', function(){

});