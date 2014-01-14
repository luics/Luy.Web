var async = require('async');

function square(number, callback) {
    var result = Math.pow(number, 2);
    setTimeout(function() {
        if (number > 3) {
            return;
        }
        console.log(number);
        var err = null;
        if (number >= 3) {
            err = true;
        }
        callback(err, result);
    }, 100 + Math.random() * 100);
}

async.mapSeries([1, 2, 3, 4, 5], square, function(err, result) {
    console.log(err, result);
});

//// Here is a simple object with an (unnecessarily roundabout) squaring method
//var AsyncSquaringLibrary = {
//    squareExponent: 2,
//    square: function(number, callback) {
//        var result = Math.pow(number, this.squareExponent);
//        setTimeout(function() {
//            callback(null, result);
//        }, 1000);
//    }
//};
//
//async.map([1, 2, 3], AsyncSquaringLibrary.square.bind(AsyncSquaringLibrary), function(err, result) {
//    // result is [1, 4, 9]
//    // With the help of bind we can attach a context to the iterator before
//    // passing it to async. Now the square function will be executed in its 
//    // 'home' AsyncSquaringLibrary context and the value of `this.squareExponent`
//    // will be as expected.
//});