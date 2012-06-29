// Copyright (c) 2009, Baidu Inc. All rights reserved.
// 
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http:// tangram.baidu.com/license.html
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
 /**
 * @namespace T Tangram七巧板
 * @name T
 * @version 1.5.2
*/

/**
 * 声明baidu包
 * @author: allstar, erik, meizz, berg
 */
var T,
    baidu = T = window.baidu || {version: "1.5.2"}; 

//提出guid，防止在与老版本Tangram混用时
//在下一行错误的修改window[undefined]
baidu.guid = "$BAIDU$";

//Tangram可能被放在闭包中
//一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
baidu.$$ = window[baidu.guid] = window[baidu.guid] || {global:{}};

/**
 * 操作日期的方法
 * @namespace baidu.date
 */
baidu.date = baidu.date || {};


/**
 * 将目标字符串转换成日期对象
 * @name baidu.date.parse
 * @function
 * @grammar baidu.date.parse(source)
 * @param {string} source 目标字符串
 * @remark
 * 
对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析： <br>
<ol>
<li>短日期可以使用“/”或“-”作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。</li>
<li>以 "July 10 1995" 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70。 </li>
<li>括号中的任何文本都被视为注释。这些括号可以嵌套使用。 </li>
<li>逗号和空格被视为分隔符。允许使用多个分隔符。 </li>
<li>月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju" 被解释为七月而不是六月。 </li>
<li>在所提供的日期中，如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合，那么该指定值就会被忽略。例如，尽管 1996 年 11 月 9 日实际上是星期五，"Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是 "Friday November 9 1996"。 </li>
<li>JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)。</li> 
<li>小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的。 </li>
<li>如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的。</li> 
<li>包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的。</li>
</ol>
		
 *             
 * @returns {Date} 转换后的日期对象
 */

baidu.date.parse = function (source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' == typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
                d1 = d.length > 1 
                        ? d[1].split(/[^\d]/) 
                        : [0, 0, 0],
                d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0, 
                            d0[1] - 1, 
                            d0[2] - 0, 
                            d1[0] - 0, 
                            d1[1] - 0, 
                            d1[2] - 0);
        } else {
            return new Date(source);
        }
    }
    
    return new Date();
};

/**
 * 对XMLHttpRequest请求的封装
 * @namespace baidu.ajax
 */
baidu.ajax = baidu.ajax || {};

/**
 * 对方法的操作，解决内存泄露问题
 * @namespace baidu.fn
 */
baidu.fn = baidu.fn || {};


/**
 * 这是一个空函数，用于需要排除函数作用域链干扰的情况.
 * @author rocy
 * @name baidu.fn.blank
 * @function
 * @grammar baidu.fn.blank()
 * @meta standard
 * @return {Function} 一个空函数
 * @version 1.3.3
 */
baidu.fn.blank = function () {};


/**
 * 发送一个ajax请求
 * @author: allstar, erik, berg
 * @name baidu.ajax.request
 * @function
 * @grammar baidu.ajax.request(url[, options])
 * @param {string} 	url 发送请求的url
 * @param {Object} 	options 发送请求的选项参数
 * @config {String} 	[method] 			请求发送的类型。默认为GET
 * @config {Boolean}  [async] 			是否异步请求。默认为true（异步）
 * @config {String} 	[data] 				需要发送的数据。如果是GET请求的话，不需要这个属性
 * @config {Object} 	[headers] 			要设置的http request header
 * @config {number}   [timeout]       超时时间，单位ms
 * @config {String} 	[username] 			用户名
 * @config {String} 	[password] 			密码
 * @config {Function} [onsuccess] 		请求成功时触发，function(XMLHttpRequest xhr, string responseText)。
 * @config {Function} [onfailure] 		请求失败时触发，function(XMLHttpRequest xhr)。
 * @config {Function} [onbeforerequest]	发送请求之前触发，function(XMLHttpRequest xhr)。
 * @config {Function} [on{STATUS_CODE}] 	当请求为相应状态码时触发的事件，如on302、on404、on500，function(XMLHttpRequest xhr)。3XX的状态码浏览器无法获取，4xx的，可能因为未知问题导致获取失败。
 * @config {Boolean}  [noCache] 			是否需要缓存，默认为false（缓存），1.1.1起支持。
 * 
 * @meta standard
 * @see baidu.ajax.get,baidu.ajax.post,baidu.ajax.form
 *             
 * @returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
baidu.ajax.request = function (url, opt_options) {
    var options     = opt_options || {},
        data        = options.data || "",
        async       = !(options.async === false),
        username    = options.username || "",
        password    = options.password || "",
        method      = (options.method || "GET").toUpperCase(),
        headers     = options.headers || {},
        // 基本的逻辑来自lili同学提供的patch
        timeout     = options.timeout || 0,
        eventHandlers = {},
        tick, key, xhr;

    /**
     * readyState发生变更时调用
     * 
     * @ignore
     */
    function stateChangeHandler() {
        if (xhr.readyState == 4) {
            try {
                var stat = xhr.status;
            } catch (ex) {
                // 在请求时，如果网络中断，Firefox会无法取得status
                fire('failure');
                return;
            }
            
            fire(stat);
            
            // http://www.never-online.net/blog/article.asp?id=261
            // case 12002: // Server timeout      
            // case 12029: // dropped connections
            // case 12030: // dropped connections
            // case 12031: // dropped connections
            // case 12152: // closed by server
            // case 13030: // status and statusText are unavailable
            
            // IE error sometimes returns 1223 when it 
            // should be 204, so treat it as success
            if ((stat >= 200 && stat < 300)
                || stat == 304
                || stat == 1223) {
                fire('success');
            } else {
                fire('failure');
            }
            
            /*
             * NOTE: Testing discovered that for some bizarre reason, on Mozilla, the
             * JavaScript <code>XmlHttpRequest.onreadystatechange</code> handler
             * function maybe still be called after it is deleted. The theory is that the
             * callback is cached somewhere. Setting it to null or an empty function does
             * seem to work properly, though.
             * 
             * On IE, there are two problems: Setting onreadystatechange to null (as
             * opposed to an empty function) sometimes throws an exception. With
             * particular (rare) versions of jscript.dll, setting onreadystatechange from
             * within onreadystatechange causes a crash. Setting it from within a timeout
             * fixes this bug (see issue 1610).
             * 
             * End result: *always* set onreadystatechange to an empty function (never to
             * null). Never set onreadystatechange from within onreadystatechange (always
             * in a setTimeout()).
             */
            window.setTimeout(
                function() {
                    // 避免内存泄露.
                    // 由new Function改成不含此作用域链的 baidu.fn.blank 函数,
                    // 以避免作用域链带来的隐性循环引用导致的IE下内存泄露. By rocy 2011-01-05 .
                    xhr.onreadystatechange = baidu.fn.blank;
                    if (async) {
                        xhr = null;
                    }
                }, 0);
        }
    }
    
    /**
     * 获取XMLHttpRequest对象
     * 
     * @ignore
     * @return {XMLHttpRequest} XMLHttpRequest对象
     */
    function getXHR() {
        if (window.ActiveXObject) {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }
        if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }
    
    /**
     * 触发事件
     * 
     * @ignore
     * @param {String} type 事件类型
     */
    function fire(type) {
        type = 'on' + type;
        var handler = eventHandlers[type],
            globelHandler = baidu.ajax[type];
        
        // 不对事件类型进行验证
        if (handler) {
            if (tick) {
              clearTimeout(tick);
            }

            if (type != 'onsuccess') {
                handler(xhr);
            } else {
                //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
                try {
                    xhr.responseText;
                } catch(error) {
                    return handler(xhr);
                }
                handler(xhr, xhr.responseText);
            }
        } else if (globelHandler) {
            //onsuccess不支持全局事件
            if (type == 'onsuccess') {
                return;
            }
            globelHandler(xhr);
        }
    }
    
    
    for (key in options) {
        // 将options参数中的事件参数复制到eventHandlers对象中
        // 这里复制所有options的成员，eventHandlers有冗余
        // 但是不会产生任何影响，并且代码紧凑
        eventHandlers[key] = options[key];
    }
    
    headers['X-Requested-With'] = 'XMLHttpRequest';
    
    
    try {
        xhr = getXHR();
        
        if (method == 'GET') {
            if (data) {
                url += (url.indexOf('?') >= 0 ? '&' : '?') + data;
                data = null;
            }
            if(options['noCache'])
                url += (url.indexOf('?') >= 0 ? '&' : '?') + 'b' + (+ new Date) + '=1';
        }
        
        if (username) {
            xhr.open(method, url, async, username, password);
        } else {
            xhr.open(method, url, async);
        }
        
        if (async) {
            xhr.onreadystatechange = stateChangeHandler;
        }
        
        // 在open之后再进行http请求头设定
        // FIXME 是否需要添加; charset=UTF-8呢
        if (method == 'POST') {
            xhr.setRequestHeader("Content-Type",
                (headers['Content-Type'] || "application/x-www-form-urlencoded"));
        }
        
        for (key in headers) {
            if (headers.hasOwnProperty(key)) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        
        fire('beforerequest');

        if (timeout) {
          tick = setTimeout(function(){
            xhr.onreadystatechange = baidu.fn.blank;
            xhr.abort();
            fire("timeout");
          }, timeout);
        }
        xhr.send(data);
        
        if (!async) {
            stateChangeHandler();
        }
    } catch (ex) {
        fire('failure');
    }
    
    return xhr;
};


/**
 * 发送一个post请求
 * @name baidu.ajax.post
 * @function
 * @grammar baidu.ajax.post(url, data[, onsuccess])
 * @param {string} 	url 		发送请求的url地址
 * @param {string} 	data 		发送的数据
 * @param {Function} [onsuccess] 请求成功之后的回调函数，function(XMLHttpRequest xhr, string responseText)
 * @meta standard
 * @see baidu.ajax.get,baidu.ajax.request
 *             
 * @returns {XMLHttpRequest} 	发送请求的XMLHttpRequest对象
 */
baidu.ajax.post = function (url, data, onsuccess) {
    return baidu.ajax.request(
        url, 
        {
            'onsuccess': onsuccess,
            'method': 'POST',
            'data': data
        }
    );
};

/**
 * 操作原生对象的方法
 * @namespace baidu.object
 */
baidu.object = baidu.object || {};

/**
 * 对语言层面的封装，包括类型判断、模块扩展、继承基类以及对象自定义事件的支持。
 * @namespace baidu.lang
 */
baidu.lang = baidu.lang || {};


/**
 * 判断目标参数是否Array对象
 * @name baidu.lang.isArray
 * @function
 * @grammar baidu.lang.isArray(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isArray = function (source) {
    return '[object Array]' == Object.prototype.toString.call(source);
};

/**
 * 判断目标参数是否为Object对象
 * @name baidu.lang.isObject
 * @function
 * @grammar baidu.lang.isObject(source)
 * @param {Any} source 目标参数
 * @shortcut isObject
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isObject = function (source) {
    return 'function' == typeof source || !!(source && 'object' == typeof source);
};

// 声明快捷方法
baidu.isObject = baidu.lang.isObject;

/**
 * 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 * 
 * @name baidu.object.isPlain
 * @function
 * @grammar baidu.object.isPlain(source)
 * @param {Object} source 需要检查的对象
 * @remark
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *             
 * @returns {Boolean} 检查结果
 */
baidu.object.isPlain  = function(obj){
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        key;
    if ( !obj ||
         //一般的情况，直接用toString判断
         Object.prototype.toString.call(obj) !== "[object Object]" ||
         //IE下，window/document/document.body/HTMLElement/HTMLCollection/NodeList等DOM对象上一个语句为true
         //isPrototypeOf挂在Object.prototype上的，因此所有的字面量都应该会有这个属性
         //对于在window上挂了isPrototypeOf属性的情况，直接忽略不考虑
         !('isPrototypeOf' in obj)
       ) {
        return false;
    }

    //判断new fun()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( obj.constructor &&
        !hasOwnProperty.call(obj, "constructor") &&
        !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in obj ) {}
    return key === undefined || hasOwnProperty.call( obj, key );
};


/**
 * 对一个object进行深度拷贝
 * 
 * @author berg
 * @name baidu.object.clone
 * @function
 * @grammar baidu.object.clone(source)
 * @param {Object} source 需要进行拷贝的对象
 * @remark
 * 对于Object来说，只拷贝自身成员，不拷贝prototype成员
 * @meta standard
 *             
 * @returns {Object} 拷贝后的新对象
 */
baidu.object.clone  = function (source) {
    var result = source, i, len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (baidu.lang.isArray(source)) {
        result = [];
        var resultLen = 0;
        for (i = 0, len = source.length; i < len; i++) {
            result[resultLen++] = baidu.object.clone(source[i]);
        }
    } else if (baidu.object.isPlain(source)) {
        result = {};
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                result[i] = baidu.object.clone(source[i]);
            }
        }
    }
    return result;
};

/**
 * 将源对象的所有属性拷贝到目标对象中
 * @author erik
 * @name baidu.object.extend
 * @function
 * @grammar baidu.object.extend(target, source)
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @see baidu.array.merge
 * @remark
 * 
1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
2.源对象的prototype成员不会拷贝。
		
 * @shortcut extend
 * @meta standard
 *             
 * @returns {Object} 目标对象
 */
baidu.extend =
baidu.object.extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    
    return target;
};

/**
 * 遍历Object中所有元素，1.1.1增加
 * @name baidu.object.each
 * @function
 * @grammar baidu.object.each(source, iterator)
 * @param {Object} source 需要遍历的Object
 * @param {Function} iterator 对每个Object元素进行调用的函数，function (item, key)
 * @version 1.1.1
 *             
 * @returns {Object} 遍历的Object
 */
baidu.object.each = function (source, iterator) {
    var returnValue, key, item; 
    if ('function' == typeof iterator) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];
                returnValue = iterator.call(source, item, key);
        
                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};

/**
 * 检测一个对象是否是空的，需要注意的是：如果污染了Object.prototype或者Array.prototype，那么baidu.object.isEmpty({})或者baidu.object.isEmpty([])可能返回的就是false.
 * @function
 * @grammar baidu.object.isEmpty(obj)
 * @param {Object} obj 需要检测的对象.
 * @return {boolean} 如果是空的对象就返回true.
 */
baidu.object.isEmpty = function(obj) {
    for (var key in obj) {
        return false;
    }
    
    return true;
};

/**
 * 获取目标对象的键名列表
 * @name baidu.object.keys
 * @function
 * @grammar baidu.object.keys(source)
 * @param {Object} source 目标对象
 * @see baidu.object.values
 *             
 * @returns {Array} 键名列表
 */
baidu.object.keys = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};


/**
 * 遍历object中所有元素，将每一个元素应用方法进行转换，返回转换后的新object。
 * @name baidu.object.map
 * @function
 * @grammar baidu.object.map(source, iterator)
 * 
 * @param 	{Array}    source   需要遍历的object
 * @param 	{Function} iterator 对每个object元素进行处理的函数
 * @return 	{Array} 			map后的object
 */
baidu.object.map = function (source, iterator) {
    var results = {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            results[key] = iterator(source[key], key);
        }
    }
    return results;
};

/**
 * 判断目标参数是否为function或Function实例
 * @name baidu.lang.isFunction
 * @function
 * @grammar baidu.lang.isFunction(source)
 * @param {Any} source 目标参数
 * @version 1.2
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 * @meta standard
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isFunction = function (source) {
    // chrome下,'function' == typeof /a/ 为true.
    return '[object Function]' == Object.prototype.toString.call(source);
};


/*
 * 默认情况下，所有在源对象上的属性都会被非递归地合并到目标对象上
 * 并且如果目标对象上已有此属性，不会被覆盖
 */
/**
 * 合并源对象的属性到目标对象。
 *
 * @name baidu.object.merge
 * @function
 * @grammar baidu.object.merge(target, source[, opt_options])
 *
 * @param {Function} target 目标对象.
 * @param {Function} source 源对象.
 * @param {Object} opt_options optional merge选项.
 * @config {boolean} overwrite optional 如果为真，源对象属性会覆盖掉目标对象上的已有属性，默认为假.
 * @config {string[]} whiteList optional 白名单，默认为空，如果存在，只有在这里的属性才会被处理.
 * @config {boolean} recursive optional 是否递归合并对象里面的object，默认为否.
 * @return {object} merge后的object.
 * @see baidu.object.extend
 * @author berg
 */
(function() {
var isPlainObject = function(source) {
        return baidu.lang.isObject(source) && !baidu.lang.isFunction(source);
    };

function mergeItem(target, source, index, overwrite, recursive) {
    if (source.hasOwnProperty(index)) {
        if (recursive && isPlainObject(target[index])) {
            // 如果需要递归覆盖，就递归调用merge
            baidu.object.merge(
                target[index],
                source[index],
                {
                    'overwrite': overwrite,
                    'recursive': recursive
                }
            );
        } else if (overwrite || !(index in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[index] = source[index];
        }
    }
}

baidu.object.merge = function(target, source, opt_options) {
    var i = 0,
        options = opt_options || {},
        overwrite = options['overwrite'],
        whiteList = options['whiteList'],
        recursive = options['recursive'],
        len;

    // 只处理在白名单中的属性
    if (whiteList && whiteList.length) {
        len = whiteList.length;
        for (; i < len; ++i) {
            mergeItem(target, source, whiteList[i], overwrite, recursive);
        }
    } else {
        for (i in source) {
            mergeItem(target, source, i, overwrite, recursive);
        }
    }

    return target;
};
})();

/**
 * 获取目标对象的值列表
 * @name baidu.object.values
 * @function
 * @grammar baidu.object.values(source)
 * @param {Object} source 目标对象
 * @see baidu.object.keys
 *             
 * @returns {Array} 值列表
 */
baidu.object.values = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};


/**
 * 操作number的方法
 * @namespace baidu.number
 */
baidu.number = baidu.number || {};


/**
 * 生成随机整数，范围是[min, max]
 * @name baidu.number.randomInt
 * @function
 * @grammar baidu.number.randomInt(min, max) 
 * 
 * @param 	{number} min 	随机整数的最小值
 * @param 	{number} max 	随机整数的最大值
 * @return 	{number} 		生成的随机整数
 */
baidu.number.randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * 操作url的方法
 * @namespace baidu.url
 */
baidu.url = baidu.url || {};

/**
 * 操作字符串的方法
 * @namespace baidu.string
 */
baidu.string = baidu.string || {};


/**
 * 将目标字符串中可能会影响正则表达式构造的字符串进行转义。
 * @name baidu.string.escapeReg
 * @function
 * @grammar baidu.string.escapeReg(source)
 * @param {string} source 目标字符串
 * @remark
 * 给以下字符前加上“\”进行转义：.*+?^=!:${}()|[]/\
 * @meta standard
 *             
 * @returns {string} 转义后的字符串
 */
baidu.string.escapeReg = function (source) {
    return String(source)
            .replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
};


/**
 * 根据参数名从目标URL中获取参数值
 * @name baidu.url.getQueryValue
 * @function
 * @grammar baidu.url.getQueryValue(url, key)
 * @param {string} url 目标URL
 * @param {string} key 要获取的参数名
 * @meta standard
 * @see baidu.url.jsonToQuery
 *             
 * @returns {string|null} - 获取的参数值，其中URI编码后的字符不会被解码，获取不到时返回null
 */
baidu.url.getQueryValue = function (url, key) {
    var reg = new RegExp(
                        "(^|&|\\?|#)" 
                        + baidu.string.escapeReg(key) 
                        + "=([^&#]*)(&|\x24|#)", 
                    "");
    var match = url.match(reg);
    if (match) {
        return match[2];
    }
    
    return null;
};

/**
 * 判断浏览器类型和特性的属性
 * @namespace baidu.browser
 */
baidu.browser = baidu.browser || {};


/**
 * 判断是否为webkit内核
 * @property isWebkit 
 * @grammar baidu.browser.isWebkit
 * @meta standard
 * @see baidu.browser.isGecko
 * @returns {Boolean} 布尔值
 */
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);

/**
 * 判断平台类型和特性的属性
 * @namespace baidu.platform
 * @author jz
 */
baidu.platform = baidu.platform || {};


/**
 * 判断是否为android平台
 * @property android 是否为android平台
 * @grammar baidu.platform.android
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.ipad
 * @return {Boolean} 布尔值
 * @author jz
 */
baidu.platform.isAndroid = /android/i.test(navigator.userAgent);

/**
 * 判断是否为ipad平台
 * @property ipad 是否为ipad平台
 * @grammar baidu.platform.ipad
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);

/**
 * 判断是否为iphone平台
 * @property iphone 是否为iphone平台
 * @grammar baidu.platform.iphone
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.macintosh,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值
 * @author jz
 */
baidu.platform.isIphone = /iphone/i.test(navigator.userAgent);

/**
 * 判断是否为macintosh平台
 * @property macintosh 是否为macintosh平台
 * @grammar baidu.platform.macintosh
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.iphone,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
baidu.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);

/**
 * 判断是否为windows平台
 * @property windows 是否为windows平台
 * @grammar baidu.platform.windows
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
baidu.platform.isWindows = /windows/i.test(navigator.userAgent);

/**
 * 判断是否为x11平台
 * @property x11 是否为x11平台
 * @grammar baidu.platform.x11
 * @meta standard
 * @see baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
baidu.platform.isX11 = /x11/i.test(navigator.userAgent);

/**
 * 判断是否为chrome浏览器
 * @grammar baidu.browser.chrome
 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.opera   
 * @property chrome chrome版本号
 * @return {Number} chrome版本号
 */
baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;

/**
 * 判断是否为firefox浏览器
 * @property firefox firefox版本号
 * @grammar baidu.browser.firefox
 * @meta standard
 * @see baidu.browser.ie,baidu.browser.safari,baidu.browser.opera,baidu.browser.chrome
 * @return {Number} firefox版本号
 */
baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;

//IE 8下，以documentMode为准
//在百度模板中，可能会有$，防止冲突，将$1 写成 \x241
/**
 * 判断是否为ie浏览器
 * @name baidu.browser.ie
 * @field
 * @grammar baidu.browser.ie
 * @returns {Number} IE版本号
 */
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;

/**
 * 判断是否为gecko内核
 * @property isGecko 
 * @grammar baidu.browser.isGecko
 * @meta standard
 * @see baidu.browser.isWebkit
 * @returns {Boolean} 布尔值
 */
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);

/**
 * 判断是否严格标准的渲染模式
 * @property isStrict 
 * @grammar baidu.browser.isStrict
 * @meta standard
 * @returns {Boolean} 布尔值
 */
baidu.browser.isStrict = document.compatMode == "CSS1Compat";

try {
    if (/(\d+\.\d+)/.test(external.max_version)) {
/**
 * 判断是否为maxthon浏览器
 * @property maxthon maxthon版本号
 * @grammar baidu.browser.maxthon
 * @see baidu.browser.ie
 * @returns {Number} maxthon版本号
 */
        baidu.browser.maxthon = + RegExp['\x241'];
    }
} catch (e) {}

/**
 * 判断是否为opera浏览器
 * @property opera opera版本号
 * @grammar baidu.browser.opera
 * @meta standard
 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.chrome
 * @returns {Number} opera版本号
 */

/**
 * opera 从10开始不是用opera后面的字符串进行版本的判断
 * 在Browser identification最后添加Version + 数字进行版本标识
 * opera后面的数字保持在9.80不变
 */
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;

(function(){
    var ua = navigator.userAgent;
    /*
     * 兼容浏览器为safari或ipad,其中,一段典型的ipad UA 如下:
     * Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10
     */
    
    /**
     * 判断是否为safari浏览器, 支持ipad
     * @property safari safari版本号
     * @grammar baidu.browser.safari
     * @meta standard
     * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.opera,baidu.browser.chrome   
     */
    baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
})();

/**
 * 判断目标参数是否string类型或String对象
 * @name baidu.lang.isString
 * @function
 * @grammar baidu.lang.isString(source)
 * @param {Any} source 目标参数
 * @shortcut isString
 * @meta standard
 * @see baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isString = function (source) {
    return '[object String]' == Object.prototype.toString.call(source);
};

// 声明快捷方法
baidu.isString = baidu.lang.isString;

/**
 * 判断目标参数是否number类型或Number对象
 * @name baidu.lang.isNumber
 * @function
 * @grammar baidu.lang.isNumber(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 * @remark 用本函数判断NaN会返回false，尽管在Javascript中是Number类型。
 */
baidu.lang.isNumber = function (source) {
    return '[object Number]' == Object.prototype.toString.call(source) && isFinite(source);
};

/**
 * 判断目标参数是否为Date对象
 * @name baidu.lang.isDate
 * @function
 * @grammar baidu.lang.isDate(source)
 * @param {Any} source 目标参数
 * @version 1.3
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isBoolean,baidu.lang.isElement
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isDate = function(o) {
    // return o instanceof Date;
    return {}.toString.call(o) === "[object Date]" && o.toString() !== 'Invalid Date' && !isNaN(o);
};

/**
 * 判断目标参数是否Boolean对象
 * @name baidu.lang.isBoolean
 * @function
 * @grammar baidu.lang.isBoolean(source)
 * @param {Any} source 目标参数
 * @version 1.3
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isArray,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isBoolean = function(o) {
    return typeof o === 'boolean';
};

/**
 * 判断目标参数是否为Element对象
 * @name baidu.lang.isElement
 * @function
 * @grammar baidu.lang.isElement(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @returns {boolean} 类型判断结果
 */
baidu.lang.isElement = function (source) {
    return !!(source && source.nodeName && source.nodeType == 1);
};


/**
 * 对目标数字进行0补齐处理
 * @name baidu.number.pad
 * @function
 * @grammar baidu.number.pad(source, length)
 * @param {number} source 需要处理的数字
 * @param {number} length 需要输出的长度
 *             
 * @returns {string} 对目标数字进行0补齐处理后的结果
 */
baidu.number.pad = function (source, length) {
    var pre = "",
        negative = (source < 0),
        string = String(Math.abs(source));

    if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
    }

    return (negative ?  "-" : "") + pre + string;
};


/**
 * 对目标日期对象进行格式化
 * @name baidu.date.format
 * @function
 * @grammar baidu.date.format(source, pattern)
 * @param {Date} source 目标日期对象
 * @param {string} pattern 日期格式化规则
 * @remark
 * 
<b>格式表达式，变量含义：</b><br><br>
hh: 带 0 补齐的两位 12 进制时表示<br>
h: 不带 0 补齐的 12 进制时表示<br>
HH: 带 0 补齐的两位 24 进制时表示<br>
H: 不带 0 补齐的 24 进制时表示<br>
mm: 带 0 补齐两位分表示<br>
m: 不带 0 补齐分表示<br>
ss: 带 0 补齐两位秒表示<br>
s: 不带 0 补齐秒表示<br>
yyyy: 带 0 补齐的四位年表示<br>
yy: 带 0 补齐的两位年表示<br>
MM: 带 0 补齐的两位月表示<br>
M: 不带 0 补齐的月表示<br>
dd: 带 0 补齐的两位日表示<br>
d: 不带 0 补齐的日表示
		
 *             
 * @returns {string} 格式化后的字符串
 */

baidu.date.format = function (source, pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }
    
    var pad     = baidu.number.pad,
        year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};

/**
 * 对目标字符串进行格式化
 * @name baidu.string.format
 * @function
 * @grammar baidu.string.format(source, opts)
 * @param {string} source 目标字符串
 * @param {Object|string...} opts 提供相应数据的对象或多个字符串
 * @remark
 * 
opts参数为“Object”时，替换目标字符串中的#{property name}部分。<br>
opts为“string...”时，替换目标字符串中的#{0}、#{1}...部分。
		
 * @shortcut format
 * @meta standard
 *             
 * @returns {string} 格式化后的字符串
 */
baidu.string.format = function (source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
	    data = data.length == 1 ? 
	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
	    	: data;
    	return source.replace(/#\{(.+?)\}/g, function (match, key){
	    	var replacer = data[key];
	    	// chrome 下 typeof /a/ == 'function'
	    	if('[object Function]' == toString.call(replacer)){
	    		replacer = replacer(key);
	    	}
	    	return ('undefined' == typeof replacer ? '' : replacer);
    	});
    }
    return source;
};

// 声明快捷方法
baidu.format = baidu.string.format;

/**
 * 操作json对象的方法
 * @namespace baidu.json
 */
baidu.json = baidu.json || {};


/**
 * 将字符串解析成json对象。注：不会自动祛除空格
 * @name baidu.json.parse
 * @function
 * @grammar baidu.json.parse(data)
 * @param {string} source 需要解析的字符串
 * @remark
 * 该方法的实现与ecma-262第五版中规定的JSON.parse不同，暂时只支持传入一个参数。后续会进行功能丰富。
 * @meta standard
 * @see baidu.json.stringify,baidu.json.decode
 *             
 * @returns {JSON} 解析结果json对象
 */
baidu.json.parse = function (data) {
    //2010/12/09：更新至不使用原生parse，不检测用户输入是否正确
    return (new Function("return (" + data + ")"))();
};

/**
 * 将json对象序列化
 * @name baidu.json.stringify
 * @function
 * @grammar baidu.json.stringify(value)
 * @param {JSON} value 需要序列化的json对象
 * @remark
 * 该方法的实现与ecma-262第五版中规定的JSON.stringify不同，暂时只支持传入一个参数。后续会进行功能丰富。
 * @meta standard
 * @see baidu.json.parse,baidu.json.encode
 *             
 * @returns {string} 序列化后的字符串
 */
baidu.json.stringify = (function () {
    /**
     * 字符串处理时需要转义的字符表
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };
    
    /**
     * 字符串序列化
     * @private
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g, 
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00" 
                            + Math.floor(c / 16).toString(16) 
                            + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }
    
    /**
     * 数组序列化
     * @private
     */
    function encodeArray(source) {
        var result = ["["], 
            l = source.length,
            preComma, i, item;
            
        for (i = 0; i < l; i++) {
            item = source[i];
            
            switch (typeof item) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if(preComma) {
                    result.push(',');
                }
                result.push(baidu.json.stringify(item));
                preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }
    
    /**
     * 处理日期序列化时的补零
     * @private
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }
    
    /**
     * 日期序列化
     * @private
     */
    function encodeDate(source){
        return '"' + source.getFullYear() + "-" 
                + pad(source.getMonth() + 1) + "-" 
                + pad(source.getDate()) + "T" 
                + pad(source.getHours()) + ":" 
                + pad(source.getMinutes()) + ":" 
                + pad(source.getSeconds()) + '"';
    }
    
    return function (value) {
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
})();
;T.undope=true;