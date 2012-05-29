;//compress 
(function ($) {
  console.log('loaded');
  /**************************************************************************
   * @namespace baidu.mobads
   **************************************************************************/
  $.baidu = $.baidu || {}; //防止与tangram等js库冲突
  var baidu = $.baidu;
  
  /**************************************************************************
   * @namespace baidu.mobads
   **************************************************************************/
  //baidu.mobads = baidu.mobads || {};
  baidu.mobads = {};
  
})(window);

(function (mob) {
  console.log('loaded');
  
  /**************************************************************************
   * @import
   **************************************************************************/
  
  var win = window;  
  win.JSON = win.JSON || {
    stringify: T.json.stringify,
    parse: T.json.parse
  }
  
  /**************************************************************************
   * Util Class
   * @class baidu.mobads.U 
   **************************************************************************/
  var U = mob.U = {};
  
  U.$ = function (strid) {
    return document.getElementById(strid);
  }

  U.f = function () {
    if(arguments.length == 0){
      return '';
    }else if(arguments.length == 1){
      return arguments[0];
    }
    
    var res = arguments[0], i;    
    //console.log(arguments.length, T.isObject(arguments[1]));
    if(arguments.length == 2 && T.isObject(arguments[1])){
      res = T.format(res, arguments[1]);
    }else{
      for (i = 1; i < arguments.length; ++i) {
        var re = new RegExp('\\{' + (i-1) + '\\}', 'g');
        res = res.replace(re, arguments[i]);
      }
    }
    return res;
  }

  /**************************************************************************
   * Base64
   **************************************************************************/
  var Base64 = U.Base64 = {}
    
  /* ----------------------------------------------------------------
  Asc: Returns an Integer representing the character code
  corresponding to the first letter in a string

  Parameters:
  String = The required string argument is any valid
  string expression. If the string if not in
  the range 32-126, the function return ZERO

  Returns: Integer
  ---------------------------------------------------------------- */
  U.asc = function(c)
  {
    var symbols = " !\"#$%&'()*+'-./0123456789:;<=>?@";
    var loAZ = "abcdefghijklmnopqrstuvwxyz";
    symbols += loAZ.toUpperCase();
    symbols += "[\\]^_`";
    symbols += loAZ;
    symbols += "{|}~";
    var loc;
    loc = symbols.indexOf(c);
    if (loc > -1)
    {
      //Ascii_Decimal = 32 + loc;
      return (32 + loc);
    }
    return (0);
  }
  
  function utfEncode(str) {
    var out, i, len, c;
    out = "";
    len = str.length;
    for(i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if ((c >= 0x0001) && (c <= 0x007F)) {
        out += str.charAt(i);
      } else if (c > 0x07FF) {
        out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
        out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      } else {
        out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
        out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
      }
    }
    return out;
  }
  
  function utfDecode(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while(i < len) {
      c = str.charCodeAt(i++);
      switch(c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          // 0xxxxxxx
          out += str.charAt(i-1);
          break;
        case 12: case 13:
          // 110x xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
          break;
        case 14:
          // 1110 xxxx 10xx xxxx 10xx xxxx
          char2 = str.charCodeAt(i++);
          char3 = str.charCodeAt(i++);
          out += String.fromCharCode(((c & 0x0F) << 12) |
            ((char2 & 0x3F) << 6) |
            ((char3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  }
 
  var rawChars = [//@todo code table
  //'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  '0KajD7AZcF2QnPr5fwiHRNygmupUTIXx69BWb-hMCGJo_V8Eskz1YdvL34letqSO'
  
  //SEG1 0KajD7AZcF2QnPr5f
  //SEG2 wiHRNygmupUTI
  //SEG3 Xx69BWb-hMCGJo_V8Eskz1Yd
  //SEG4 vL34letqSO
  ];
  //rawChars.push(SEG1+SEG2+SEG3+SEG4);
  var base64EncodeCharsList = [];
  var base64DecodeCharsList = [];
  var base64Index = 0;
  var rawDecodeChars = [], i, j;
  for(i = 0; i < 128; ++i){
    rawDecodeChars.push(-1);
  }
  
  for(i = 0; i < rawChars.length; ++i){
    base64EncodeCharsList.push([]);
    base64DecodeCharsList.push(rawDecodeChars.slice(0));
    for(j = 0; j < rawChars[i].length; ++j){
      base64EncodeCharsList[i].push(rawChars[i][j]);
      base64DecodeCharsList[i][U.asc(rawChars[i][j])] = j;
    }
  }
  //  var base64EncodeChars = base64EncodeCharsList[0];
  //  var base64DecodeChars = base64DecodeCharsList[0];
  //  var base64EncodeChars = [
  //  "A", "B", "C", "D", "E", "F", "G", "H",
  //  "I", "J", "K", "L", "M", "N", "O", "P",
  //  "Q", "R", "S", "T", "U", "V", "W", "X",
  //  "Y", "Z", "a", "b", "c", "d", "e", "f",
  //  "g", "h", "i", "j", "k", "l", "m", "n",
  //  "o", "p", "q", "r", "s", "t", "u", "v",
  //  "w", "x", "y", "z", "0", "1", "2", "3",
  //  "4", "5", "6", "7", "8", "9", "+", "/"
  //  ];
  //
  //  var base64DecodeChars = [
  //  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  //  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
  //  -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
  //  52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
  //  -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
  //  15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
  //  -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  //  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1
  //  ];

  /**
   * @function
   * @param {string} str
   * @return {string}
   */
  Base64.encode = function(str){
    return _encode(str, base64EncodeCharsList[0]);
  }
  
  function _encode(str, base64EncodeChars) {
    str = str + '';
    var out, i, j, len;
    var c1, c2, c3;
    var PAD = '$';
    str = utfEncode(str);
    
    //str补足3的整数倍
    var padlen = ((3-str.length%3))%3;
    var append = '';
    while(--padlen >= 0){
      append += PAD; 
    }
    if(append != ''){
      str += append;
    }

    len = str.length;
    i = j = 0;
    out = [];
    while (i < len) {
      c1 = str.charCodeAt(i++) & 0xff;
      if (i == len)
      {
        out[j++] = base64EncodeChars[c1 >> 2];
        out[j++] = base64EncodeChars[(c1 & 0x3) << 4];
        out[j++] = PAD+PAD;
        break;
      }
      c2 = str.charCodeAt(i++) & 0xff;
      if (i == len)
      {
        out[j++] = base64EncodeChars[c1 >> 2];
        out[j++] = base64EncodeChars[((c1 & 0x03) << 4) | ((c2 & 0xf0) >> 4)];
        out[j++] = base64EncodeChars[(c2 & 0x0f) << 2];
        out[j++] = PAD;
        break;
      }
      c3 = str.charCodeAt(i++) & 0xff;
      out[j++] = base64EncodeChars[c1 >> 2];
      out[j++] = base64EncodeChars[((c1 & 0x03) << 4) | ((c2 & 0xf0) >> 4)];
      out[j++] = base64EncodeChars[((c2 & 0x0f) << 2) | ((c3 & 0xc0) >> 6)];
      out[j++] = base64EncodeChars[c3 & 0x3f];
    }
    return out.join('');
  }

  /**
   * @function
   * @param {string} str
   * @return {string}
   */
  Base64.decode = function (str) {
    return _decode(str, base64DecodeCharsList[base64Index]);    
  }
  
  function _decode (str, base64DecodeChars) {
    var c1, c2, c3, c4;
    var i, j, len, out;
    var PAD = 36; //61:=  36:$
    len = str.length;
    i = j = 0;
    out = [];
    while (i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c1 == -1);
      if (c1 == -1) break;

      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while (i < len && c2 == -1);
      if (c2 == -1) break;

      out[j++] = String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if (c3 == PAD) return out.join('');
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);
      if (c3 == -1) break;

      out[j++] = String.fromCharCode(((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == PAD) return out.join('');
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);
      if (c4 == -1) break;
      out[j++] = String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    
    //return _utf8_decode(out.join(''));
    return utfDecode(out.join('')).replace(/\$+$/, '');
  }
  
  U.enc = Base64.encode;
  U.dec = Base64.decode;  
  /**************************************************************************
   * Native Helper
   **************************************************************************/  
    
  /**
   * @private
   * @function
   * @param {function} eventHandler
   * @param {string} [eventType] 指定类型
   * @return {string} token
   */
  U.natRegEv = function(eventHandler, eventType){
    //    if(!T.lang.isFunction(eventHandler)){
    //      throw 'eventHandler is not function';
    //    }
    eventType = eventType || '';   
    U.__events = U.__events || {};
    
    //@todo how to improve token value
    var token = U.f('_{0}_{1}_{2}', eventType, new Date().getTime(), T.number.randomInt(0, 4294967296)); //2^32
    U.__events[token] = eventHandler;
    
    return token;
  }
  
  /**
   * @private
   * @function
   * @param {string} command, or json code in ios
   * @param {function} handler
   *         {string} methodName [optional]
   *         {string} params [optional]
   */
  U.natInvoke = function(command, handler){
    var methodName = arguments.length >= 3 ? arguments[2] : '';
    var params = arguments.length >= 4 ? arguments[3] : '';
    
    //console.log('natInvoke', command, typeof handler, methodName, params);
    var token = U.natRegEv(handler, 'invoke');
    if(typeof MobadsSdk != 'undefined' && MobadsSdk.invoke && command != ''){
      MobadsSdk.invoke(command, token, methodName, params);
    }else{
      U.natFireEvent(token, '');
    }
  }
  
  /**
   * @function
   * @param token {string}
   * @param res {string}
   */
  U.natFireEvent = function(token, res){
    //res = Base64.decode(res);
    res = res || '';
    if(token != '' && U.__events && U.__events[token] && T.lang.isFunction(U.__events[token])){
      U.__events[token](res);      
      delete U.__events[token];//remove this event
    }
  }
  
  /**************************************************************************
   * other
   **************************************************************************/
  /**
   * parse integer color to array, e.g. 0xaarrggbb -> [0xrr, 0xgg, 0xbb]
   * @function
   * @return {array} [r, g, b]
   */
  U.parseColor = function(color){
    return [(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF];    
  }
  
  /**
   * parse integer color to array, e.g. 0xaarrggbb -> [0xrr, 0xgg, 0xbb]
   * @function
   * @return {array} [r, g, b]
   */
  U.parseBoolean = function(bl){
    return ('true' == (bl + '').toLowerCase() ? true : false);      
  }
  
  /**
   * parse density number to level 
   * @function
   * @return {string} h|m|l
   */
  U.parseDensity = function (density) {
    var v; //, density = Sdk.P.DENSITY;
    if (density >= 2) {//high definition, ios & android
      v = "h"; //"h"
    }else if (density >= 1.5){//android 480px width
      v = "m";
    }else{//320px width
      v = "l";//"l"
    }
    
    return v;
  }
  
  /**
   * num to hex string
   * @function
   * @param {number} num
   * @param {number} len
   * @param {string} pad
   * @return {string} hex string
   */
  U.num2hex = function(num, len, pad){
    num = parseInt(num, 10);
    len = len || 0;
    pad = pad || '0';    
    var hex = [];
    var h = num.toString(16);
    
    for(var i=0; i < len - h.length; ++i){
      hex.push(pad);
    }
    hex.push(h);
    
    return hex.join('');
  }
  
  /**
   * Load javascript file, append a <script /> to last script
   *
   * @function
   * @param {string} jsUrl
   * @param {boolean} asLastOne
   */
  U.loadJs = function(jsUrl, asLastOne){
    asLastOne = asLastOne || false;
    var d = document;
    if(asLastOne){
      var script = d.createElement("script");
      script.type = "text/javascript";
      script.async = false;
      script.src = jsUrl;
      var s = d.getElementsByTagName("script");
      s = s[s.length-1];
      s.parentNode.appendChild(script);      
    }else{
      var mark = (U.f('<script type="text/javascript" src="{0}"></'+'script>'), jsUrl);
      d.write(mark);
    }
  }

  /**
   * 简单插入排序
   * 
   * @param {array} items
   * @param {function} compare
   */
  U.insertSort = function(items, compare){
    if(!items || !T.lang.isFunction(compare)){
      return items;
    }
    var i, j, k;
    for(i = 1; i < items.length; ++i){
      var current  = items[i];
      for(j = i - 1; j >= 0 && compare(current, items[j]) < 0; --j){}
      for(k = i; k > j + 1; --k){
        items[k] = items[k-1];
      }
      items[k] = current;
    }
    return items;
  } 
//end
})(baidu.mobads); 