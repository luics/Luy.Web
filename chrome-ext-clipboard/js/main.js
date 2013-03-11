/**
 * Plugin Entry
 *
 * @author luics(luics.xu@gmail.com)
 * @date 2013-03-11
 */
require(['jquery', 'model', 'util'], function($, model, util) {
    var C = {
        CONTENT: '#content',
        RECORD: '#record',
        PUSH: '#add',
        LOAD: '#load',
        DEL: '#del'
    };

    $(function() {
        function update() {
            var records = model.getAll();
            var html = [];
            for (var key in records) {
//                html.push(util.fm('<span class="stack-item" title="{1}">{0}</span>',
//                    key, util.htmlEncode(records[key])));

//                var dis = util.htmlEncode(records[key]).substr(0, 20);
                var dis = (records[key]).substr(0, 20);
                html.push(util.fm('<option value="{0}" title="">{1}</option>',
                    key, dis));
            }
            $(C.RECORD).html(html.join(''));
        }

        $(C.CONTENT).keyup(function(e) {
            var value = $(C.CONTENT).val();
            model.setTmp(value);
        });

        $(C.PUSH).click(function(e) {
            var value = $(C.CONTENT).val();
            if(value===''){
                return;
            }
            
            model.push(value);
            update();
        });

        $(C.LOAD).click(function(e) {
            var value = model.get($(C.RECORD).val());
            $(C.CONTENT).val(value);
        });

        $(C.DEL).click(function(e) {
            var key = $(C.RECORD).val();
            model.del(key);
            update();
        });

        $(C.CONTENT).val(model.getTmp());
        update();
    });
});
