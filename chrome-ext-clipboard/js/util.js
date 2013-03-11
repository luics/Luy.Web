/**
 * Utils
 *
 * @author luics(luics.xu@gmail.com)
 * @date 2013-03-11
 */

define(function() {
    var uIdMap_ = {}; //for random

    return  {
        /**
         * String Format
         * @return {*}
         */
        fm: function() {
            if (arguments.length == 0) {
                return '';
            }
            else if (arguments.length == 1) {
                return arguments[0];
            }

            var res = arguments[0], i;
            for (i = 1; i < arguments.length; ++i) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'g');
                res = res.replace(re, arguments[i]);
            }
            return res;
        },
        /**
         * 获取不重复的随机串
         *
         * @param {number} opt_len 随机串长度，默认为10
         * @return {string}
         */
        getUID: function(opt_len) {
            opt_len = opt_len || 10;

            var chars = "qwertyuiopasdfghjklzxcvbnm1234567890",
                charsLen = chars.length,
                len2 = opt_len,
                rand = "";

            while (len2--) {
                rand += chars.charAt(Math.floor(Math.random() * charsLen));
            }

            if (uIdMap_[ rand ]) {
                return getUID(opt_len);
            }

            uIdMap_[ rand ] = 1;
            return rand;
        },
        /**
         * HTML Encoding
         * @return {*}
         */
        htmlEncode: function(src) {
            return src
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/'/g, '&#39;')
                .replace(/"/g, '&quot;');
        },
        /**
         * HTML Decoding
         * @return {*}
         */
        htmlDecode: function(src) {
            return src
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, '\'')
                .replace(/&gt;/g, '>')
                .replace(/&lt;/g, '<')
                .replace(/&/g, '&amp;');
        }
    };
});