var EventEmitter = require('events').EventEmitter;

/**
 *
 * @param name {string}
 * @constructor
 */
function Dog(name) {
    this.name = name;
}
Dog.prototype.__proto__ = EventEmitter.prototype;

var simon = new Dog('simon'),
    E_BARK = 'bark',
    bark = function () {
        console.log(this.name, ' barked ', arguments[0]);
    };
simon.on(E_BARK, bark);

var count = 0;
setInterval(function () {
    simon.emit(E_BARK, count);
    console.log('setInterval', count);
    if (++count > 3) {
        console.log(simon.listeners(E_BARK));
        simon.removeListener(E_BARK, bark);
    }
}, 300);