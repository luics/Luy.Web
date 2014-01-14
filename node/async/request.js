var async = require('async');
var request = require('request');

function req(url, callback) {
    request.get(url, function(freq, fres, fbody) {
        callback(null, fbody);
    });
}

async.map([
    'http://gitlab.alibaba-inc.com/api/v3/projects/3969/repository/commits/753dedd77e17c2e3fc245a28b5bbc428e2c5091f/blob?private_token=Sy5j5DA3ULw1keCja1Pp&filepath=demo%2Fdata%2FgetExpiringCoupons.js', 'http://gitlab.alibaba-inc.com/api/v3/projects/3969/repository/commits/753dedd77e17c2e3fc245a28b5bbc428e2c5091f/blob?private_token=Sy5j5DA3ULw1keCja1Pp&filepath=demo%2Fdata%2FgetMyInfo.js'], req, function(err, result) {
    console.log(err, result);
});