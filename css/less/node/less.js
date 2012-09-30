var less = require('less');

less.render('.class { width: 1 + 1 }', function (e, css) {
    console.log(css);
});