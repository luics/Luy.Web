/**
 * Set `Server` header on response.
 *
 * @return {Function}
 * @api public
 */
module.exports = function server(info) {
  info = info || null;
  
  return function(req, res, next) {
    if (info) {
      var val = '';
      if (Array.isArray(info)) {
        var comp;
        for (var i = 0, len = info.length; i < len; i++) {
          var comp = info[i];
          if (i > 0) { val += ' '; }
          val += fmt(comp);
        }
      } else {
        val = fmt(info);
      }
      res.setHeader('Server', val);
    } else {
      res.removeHeader('Server');
    }
    next();
  }
}


function fmt(obj) {
  if (typeof obj == 'string') { return obj; }
  
  var str = '';
  if (obj.name) { str += obj.name; }
  if (obj.version) { str += '/' + obj.version }
  if (obj.comment) {
    if (str.length) { str += ' '; }
    str += '(' + obj.comment + ')';
  }
  return str;
}
