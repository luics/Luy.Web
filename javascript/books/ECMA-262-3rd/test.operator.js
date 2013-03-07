module('test.operator.js');

test('== & ===', function() {
    var num = 1;
    var str = '1';
    equal(true, num == str);
    equal(false, num === str);
});

test('!= & !==', function() {
    var num = 1;
    var str = '1';
    equal(false, num != str);
    equal(true, num !== str);
});