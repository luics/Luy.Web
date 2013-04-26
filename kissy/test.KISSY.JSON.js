var S = KISSY,
    parse = S.JSON.parse,
    stringify = S.JSON.stringify,
    obj = {a: 1},
    str = '{"a":1}';

module('KISSY.JSON');

test('parse', function() {
    deepEqual(obj, parse(str));
});

test('stringify', function() {
    ok(str === stringify(obj));

    // 无限循环,捕获异常
    var o = {a: 1};
    o.b = o;
    //raises(stringify(o), new Error());
});

