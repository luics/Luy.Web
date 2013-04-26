var S = KISSY,
    C = S.Cookie;

module('KISSY.Cookie');

var VALUE = 'luics',
    KEY = 'name',
    DOMAIN = 'luics.com'; //improve

test('simple', function() {
    C.set(KEY, VALUE);
    ok(C.get(KEY) === VALUE);
    C.remove(KEY);
    ok(C.get(KEY) === undefined);
});

test('with domain', function() {
    var EXPIRES = +new Date + 2 * 1000;
    
    C.set(KEY, VALUE, EXPIRES, DOMAIN);
    ok(C.get(KEY) === VALUE);
    C.remove(KEY);
    ok(C.get(KEY) === VALUE);
    C.remove(KEY, DOMAIN + '1');
    ok(C.get(KEY) === VALUE);

    C.set(KEY, VALUE, EXPIRES, DOMAIN);
    C.remove(KEY, DOMAIN);
    ok(C.get(KEY) === undefined);
});
