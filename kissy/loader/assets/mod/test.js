KISSY.add('mod/test', function() {
        console.log('test module');

        return {
            func1: function() {
                console.log('func1');
            }
        };

    },
    {
        requires: ['remote.css', './local.css'] // 该模块的一些依赖项,
    }
);