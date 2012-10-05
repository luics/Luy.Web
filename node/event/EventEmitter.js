var EventEmitter = require('events').EventEmitter,
  util = require('util');

var Animal = function () {
  this.on('newListener', function () {
    console.log('newListener');
  });
};
util.inherits(Animal, EventEmitter);

var Cat = function (name) {
  this.name = name;

  this.on('mew', function () {
    console.log('[mew]', name);
  });
};
//Cat.prototype = EventEmitter.prototype;
util.inherits(Cat, Animal);
new Cat('cat1').emit('mew');
new Cat('cat2').emit('mew');

var Dog = function (name) {
  this.name = name;

  this.on('bark', function () {
    console.log('[bark]', name);
  });
};
//Cat.prototype = EventEmitter.prototype;
util.inherits(Dog, Animal);
new Dog('dog1').emit('bark');
new Dog('dog2').emit('bark');