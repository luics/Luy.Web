var EventEmitter = require('events').EventEmitter;

/**
 *
 * @param option {object}
 * @constructor
 */
function Dog(option) {
    this.name = option.name || 'dog' + (+new Date);
    this.age = option.age || 0;

    this.on(Dog.E_BARK, function () {
        console.log(this.name, this.age, 'barked', arguments[0]);
    });

    this.on(Dog.E_EAT, function () {
        console.log(this.name, this.age, 'eating', arguments[0]);
    });
}

Dog.prototype = EventEmitter.prototype;
Dog.E_BARK = 'bark';
Dog.E_EAT = 'eat';


exports.Dog = Dog;