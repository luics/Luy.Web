/**
 *
 * @author luics
 * @version 1.0.0
 * @date 4/30/13 9:56 AM
 */

/**
 *
 * @param value
 * @returns {*}
 */
function test(value) {
//   function t(){
    var a = 1;

    var b = 1;

    switch (typeof value) {
        case 'undefined':
            return 'undefined';

        case 'number':
            return isFinite(value) ? String(value) : "null";

        case 'string':
            return encodeString(value);

        case 'boolean':
            return String(value);

        default:
            if (value === null) {
                return 'null';
            } else if (value instanceof Array) {
                return encodeArray(value);
            } else if (value instanceof Date) {
                return encodeDate(value);
            } else {
                var result = ['{'],
                    encode = baidu.json.stringify,
                    preComma,
                    item;

                for (var key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        item = value[key];
                        switch (typeof item) {
                            case 'undefined':
                            case 'unknown':
                            case 'function':
                                break;
                            default:
                                if (preComma) {
                                    result.push(',');
                                }
                                preComma = 1;
                                result.push(encode(key) + ':' + encode(item));
                        }
                    }
                }
                result.push('}');
                return result.join('');
            }
    }
};