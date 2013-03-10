module('test.type.js');

test('Undefined', function() {
    var pri;
    var pri1;
    equal('undefined', typeof pri);
    equal(true, pri === pri1);
});

test('Null', function() {
    var pri = null;
    var pri1 = null;
    var und;
    equal('object', typeof pri); // bug? 
    ok(pri === pri1);
    ok(pri == und);
    equal(false, pri === und);
});

test('Boolean value & object', function() {
    var pri = true;
    var obj = new Boolean(pri);
    equal('boolean', typeof pri);
    equal('object', typeof obj);
    ok(pri == obj);// obj cast to primitive value
    equal(false, pri === obj);
});

test('String value & object', function() {
    var pri = 'string';
    var obj = new String(pri);
    equal('string', typeof pri);
    equal('object', typeof obj);
    ok(pri == obj);
    equal(false, pri === obj);

    // length
    ok(3 === 'str'.length);
    ok(4 === 'str\u0020'.length);
    ok(3 === '字符串'.length); // not bytes
});

test('Number value & object', function() {
    var pri = 1;
    var obj = new Number(pri);
    equal('number', typeof pri);
    equal('object', typeof obj);
    ok(pri == obj);
    equal(false, pri === obj);

    // Special value of type Number
    equal('number', typeof Infinity);
    ok(Infinity === Infinity);
    equal('number', typeof NaN);
    equal(false, NaN == NaN);
    equal(false, NaN === NaN);
    ok(NaN != NaN);
    ok(NaN !== NaN);
});