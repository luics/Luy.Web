var Dog = require('./Dog').Dog;

var simon = new Dog({name:'simon', age:3}),
    tj = new Dog({name:'tj', age:4});

var count = 0,
    SEP = '-----';
interval = setInterval(function () {
    console.log(SEP, 'setInterval', count, SEP);

    simon.emit(Dog.E_BARK, count);
    tj.emit(Dog.E_EAT, count);

    if (++count > 3) {
        clearInterval(interval);
    }
}, 300);