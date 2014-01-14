var async = require('async');
var request = require('request');

function req(url, callback) {
    request.get(url, function(freq, fres, fbody) {
        callback(null, fbody);
    });
}

async.map(['http://gitlab.alibaba-inc.com/api/v3/projects?private_token=Sy5j5DA3ULw1keCja1Pp&page=1&per_page=1', 'http://gitlab.alibaba-inc.com/api/v3/projects?private_token=Sy5j5DA3ULw1keCja1Pp&page=2&per_page=1'], req, function(err, result) {
    console.log(err, result);
});