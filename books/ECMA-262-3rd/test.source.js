module('test.source.js');

test('Any Unicode Character', function() {
    ok('chinese');
    ok('中文');
    ok('\u8900');

    var 中文变量名 = 'chinese';
    ok(中文变量名);
});

test('Whitespace', function() {
    ok('|\u0009|');
    ok('|\u000b|');
    ok('|\u000c|');
    ok('|\u0020|');
    ok('|\u00A0|');
});

test('Line Terminal', function() {
    ok('|\u000a|');
    ok('|\u000d|');
    ok('|\u2028|');
    ok('|\u2029|');
});