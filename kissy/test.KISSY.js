var S = KISSY;

module('KISSY type');

test('isArray', function() {
    ok(S.isArray([]));
    ok(S.isArray(new Array()));
    ok(S.isArray([
        {}
    ]));
    ok(!S.isArray({}));
    ok(!S.isArray(null));
    ok(!S.isArray());
    ok(!S.isArray('[]'));
});

test('isBoolean', function() {
    ok(S.isBoolean(false));
    ok(S.isBoolean(true));
    ok(!S.isBoolean(1));
});

test('isDate', function() {
    ok(S.isDate(new Date()));
    ok(!S.isDate('2013-1-1'));
    ok(!S.isDate(null));
    ok(!S.isDate());
});

test('isEmptyObject', function() {//view source
    ok(S.isEmptyObject({}));
    ok(S.isEmptyObject([]));
    ok(S.isEmptyObject(null));
    ok(S.isEmptyObject());
    ok(S.isEmptyObject(0), 'not for none-object');
    ok(S.isEmptyObject(1), 'not for none-object');
    ok(!S.isEmptyObject('1'), 'not for none-object');
    ok(!S.isEmptyObject({a: 0}));
    ok(!S.isEmptyObject([0]));
});

test('isFunction', function() {
    ok(S.isFunction(function() {
    }));
    ok(S.isFunction(new Function()));
    ok(!S.isFunction({}));
    ok(!S.isFunction(null));
    ok(!S.isFunction());
});

test('isNull', function() {
    ok(S.isNull(null));
    ok(!S.isNull());
});

test('isNumber', function() {
    ok(S.isNumber(0));
    ok(S.isNumber(1));
    ok(S.isNumber(new Number(0)));
    ok(!S.isNumber('0'));
    ok(!S.isNumber(null));
    ok(!S.isNumber());
});

test('isObject', function() {
    ok(S.isObject({}));
    ok(S.isObject(new Object()));
    ok(S.isObject({a: 0, b: []}));
    ok(!S.isObject([]));
    ok(!S.isObject(null));
    ok(!S.isObject());
    ok(!S.isObject('{}'));
});

test('isPlainObject', function() {
    ok(S.isPlainObject({}));
    ok(S.isPlainObject(new Object()));
    ok(S.isPlainObject({a: 0, b: []}));
    function C() {
    };
    ok(!S.isPlainObject(new C()));
    ok(!S.isPlainObject(null));
    ok(!S.isPlainObject());
});

test('isRegExp', function() {
    ok(S.isRegExp(/ /));
    ok(S.isRegExp(new RegExp(' ')));
    ok(!S.isRegExp(null));
    ok(!S.isRegExp());
});

test('isString', function() {
    ok(S.isString(''));
    ok(S.isString(new String('')));
    ok(!S.isString(null));
    ok(!S.isString());
});

test('isUndefined', function() {
    ok(S.isUndefined());
    ok(!S.isUndefined(null));
});

test('isWindow', function() {
    ok(S.isWindow(window));
    ok(!S.isWindow({}));

    //Causion!
    var o = {};
    o.window = o;
    ok(S.isWindow(o));
});

test('clone', function() {
    var obj = {a: 1, b: [1], c: {a: [1, '1', true, null, undefined]}};
    var clone = S.clone(obj);
    deepEqual(obj, clone);
    var tmp = clone.a;
    clone.a = 2;
    notDeepEqual(obj, clone);
    clone.a = tmp;
    deepEqual(obj, clone);
});

module('KISSY array utility');

test('each', function() {
    ok(1);
//    var arr = [1, 2, 1];
});


test('unique', function() {
    var arr = [1, 2, 1];
    deepEqual([1, 2], S.unique(arr));
    deepEqual([2, 1], S.unique(arr, true));
});

