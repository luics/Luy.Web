window.console = window.console || {};
console.log = console.log || new Function();

KISSY.add('util', function(S) {
    var U = {
        fm: function(source, data, opts) {
                var toString = Object.prototype.toString;
            if (data.length) {
                data = data.length == 1 ?

                    (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data)
                    : data;
                return source.replace(/#\{(.+?)\}/g, function(match, key) {
                    var replacer = data[key];
                    // chrome 下 typeof /a/ == 'function'
                    if ('[object Function]' == toString.call(replacer)) {
                        replacer = replacer(key);
                    }
                    return ('undefined' == typeof replacer ? '' : replacer);
                });
            }
            return source;
        }
    };

    return U;
});

KISSY.use('ajax', function(S, IO) {
    console.log('loading init');
    var loading = KISSY.one(".loading");
    var num = 0;

    if (!loading) {
        return;
    }

    //发送前显示 loading 状态
    IO.on("send", function() {
        num++;
        loading.show();
    });

    //发送后隐藏 loading 状态
    IO.on("complete", function() {
        num--;
        if (!num)
            loading.hide();
    });
});