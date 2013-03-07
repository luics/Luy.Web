module('test.prototype.js');

function C(p) {
    this.p = p;
}

var PRO = {
    p1: 1
};

C.prototype = PRO;

test('Prototype', function() {
    var o = new C(0);

    ok(C.prototype === PRO);
    ok(o.__proto__ === PRO);
    ok(o.__proto__ === C.prototype);

    equal('function Object() { [native code] }', o.constructor.toString());
    ok(C.constructor !== C);
    ok(C.prototype.constructor === Object);

    //chrome console output
//    equal('undefined', typeof o.prototype);

//    equal('Object {}', o.constructor.prototype.toString());
//    equal('function Function() { [native code] }', C.constructor.toString());
//    equal('function Empty() {}', o.constructor.prototype.toString());
});
