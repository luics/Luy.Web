module('test.prototype.js');

function C(p) {
    this.p = p;
}

var proto = {
    p1: 1
};

C.prototype = proto;

test('Prototype', function() {
    var o = new C(0);

    ok(C.prototype === proto);
    o.__proto__ && ok(o.__proto__ === proto);
    o.__proto__ && ok(o.__proto__ === C.prototype);

    //equal('function Object() { [native code] }', o.constructor.toString());
    ok(C.constructor !== C);//?
    //equal('function Function() { [native code] }', C.constructor.toString());
    ok(C.prototype.constructor === Object);

//    equal('Object {}', o.constructor.prototype.toString());
//    equal('function Empty() {}', o.constructor.prototype.toString());
});
