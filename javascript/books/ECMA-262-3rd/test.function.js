module('test.function.js');

// 10.1.3
test('Function Parameter', function() {

    function test(p0, p1, p0) {
        ok(p0 === 2);// not 0
        ok(p1 === 1);
        ok(typeof p2 === 'undefined');
    }

    test(0, 1, 2);
});

// 10.1.8
test('Arguments object', function() {

    function test() {
        ok(arguments.constructor.prototype === Object.prototype);
        ok(arguments.callee === test);

        // arguments is not an Array instance
        ok(arguments.length === 5); // DontEnum
        ok(arguments.prototype !== Array.prototype); // DontEnum

        var i;
        for (i = 0; i < arguments.length; ++i) {
            ok(i === arguments[i]);
        }

        i = 0;
        for (var key in arguments) {// not safe?
            //console.log(i, key);
            ok(i === arguments[key]);
            ++i;
        }
    }

    test(0, 1, 2, 3, 4);
});