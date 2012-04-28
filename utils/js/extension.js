(function () {    
  String.prototype.format = function () {
    //throw Errors.notImplemented;
    var res = this,
    i;
      
    for (i = 0; i < arguments.length; ++i) {
      //info(i + ':' + arguments[i]);
      var re = new RegExp('\\{' + i + '\\}', 'g');
      res = res.replace(re, arguments[i]);
    }
    return res;
  };
  
  
  /**************************************************************************
   * Base64
   **************************************************************************/
  window.Base64 = {};
    
  /* ----------------------------------------------------------------
  Asc: Returns an Integer representing the character code
  corresponding to the first letter in a string

  Parameters:
  String = The required string argument is any valid
  string expression. If the string if not in
  the range 32-126, the function return ZERO

  Returns: Integer
  ---------------------------------------------------------------- */
  window.asc = function(c)
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
      Ascii_Decimal = 32 + loc;
      return (32 + loc);
    }
    return (0);
  }
  
  function utf16to8(str) {
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
  
  function utf8to16(str) {
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
  
  var rawChars = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  '0KajD7AZcF2QnPr5fwiHRNygmupUTIXx69BWb-hMCGJo_V8Eskz1YdvL34letqSO'];
  var base64EncodeCharsList = [];
  var base64DecodeCharsList = [];
  var base64Index = 1;
  var rawDecodeChars = [], i, j;
  for(i = 0; i < 128; ++i){
    rawDecodeChars.push(-1);
  }
  
  for(i = 0; i < rawChars.length; ++i){
    base64EncodeCharsList.push([]);
    base64DecodeCharsList.push(rawDecodeChars.slice(0));
    for(j = 0; j < rawChars[i].length; ++j){
      base64EncodeCharsList[i].push(rawChars[i][j]);
      base64DecodeCharsList[i][window.asc(rawChars[i][j])] = j;
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
    return _encode(str, base64Index);
  }
  
  var _encode = function (str, ind) {
    var out, i, j, len;
    var c1, c2, c3;
    var PAD = '$';
    str = utf16to8(str);
    var base64EncodeChars = base64EncodeCharsList[ind];

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
    return _decode(str, base64Index);    
  }
  
  var _decode = function (str, ind) {
    var c1, c2, c3, c4;
    var i, j, len, out;
    var base64DecodeChars = base64DecodeCharsList[ind];

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
        if (c3 == 36) return out.join(''); //61:=  36:$
        c3 = base64DecodeChars[c3];
      } while (i < len && c3 == -1);
      if (c3 == -1) break;

      out[j++] = String.fromCharCode(((c2 & 0x0f) << 4) | ((c3 & 0x3c) >> 2));

      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if (c4 == 61) return out.join('');
        c4 = base64DecodeChars[c4];
      } while (i < len && c4 == -1);
      if (c4 == -1) break;
      out[j++] = String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    
    //return out.join('');
    //return utfDecode(out.join(''));
    return utf8to16(out.join('')).replace(/\$+$/, '');
  }
  
  /**************************************************************************
   * other
   **************************************************************************/
  /**
   * parse integer color to array, e.g. 0xaarrggbb -> [0xrr, 0xgg, 0xbb]
   * @function
   * @return {array} [r, g, b]
   */
  window.parseColor = function(color){
    return [(color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF];    
  }
  
  /**
   * parse integer color to array, e.g. 0xaarrggbb -> [0xrr, 0xgg, 0xbb]
   * @function
   * @return {array} [r, g, b]
   */
  window.parseBoolean = function(bl){
    return ('true' == (bl + '').toLowerCase() ? true : false);      
  }
  
  /**
   * parse density number to level 
   * @function
   * @return {string} h|m|l
   */
  window.parseDensity = function (density) {
    var v; //, density = Sdk.P.DENSITY;
    if (density >= 2) {//high definition, ios & android
      v = "h"; 
    }else if (density >= 1.5){//android 480px width
      v = "m";
    }else{//320px width
      v = "l";
    }
    
    console.log('parseDensity', typeof v, v);    
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
  window.num2hex = function(num, len, pad){
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

})();
 
