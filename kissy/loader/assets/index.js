//KISSY.getScript('index.css', function() {
//    console.log('index.css loaded');
//});

//KISSY.getScript('test.js', {
//    success: function() {
//console.log('test.js loaded');

KISSY.use('mod/test, mod/action', function(S, Test, Action) {

    console.log('test', Test, Action);

    Test.func1();

    new Action();
});

//console.log('end');
//}
//});