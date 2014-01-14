var async = require('async');

var a = 1;
async.series([
    function(callback) {
        setTimeout(function() {
            console.log(a);
            a = 3;
            callback(null, {});
        }, 1000);
    },
    function(callback) {
        setTimeout(function() {
            console.log(a);
            callback(null, a);
        }, 100);
    }
], function() {
    console.log('end');
});

