S = KISSY;

function Dur() {
    this._start = 0;
    this._end = 0;
}

Dur.prototype.start = function() {
    this._start = +new Date();
};

Dur.prototype.end = function() {
    this._end = +new Date();
};

Dur.prototype.get = function() {
    return this._end - this._start;
};

var index = 0;

function log() {
    var $result = S.one('.result');
    if (!$result) return;
//    console.log($result);

    var msg = [index++ + ' - '];
    for (var i = 0; i < arguments.length; ++i) {
        msg.push(arguments[i] + ' ');
    }
    msg.push('<br>');
    msg.push($result.html());
    $result.html(msg.join(''));
}