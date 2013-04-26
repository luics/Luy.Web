/**
 * 雅安地震 - 物资互助
 *
 * @author: 鬼道(luics)
 * @date: 13-4-22
 */

KISSY.use('xtemplate, cookie', function(S, XTemplate, Cookie) {
    console.log('wuzi init');

    var THEAD = [
        '<tr>',
        '{{#each header}}',
        '<th>{{name}}</th>',
        '{{/each}}',
        '</tr>'
    ].join('');
    var TBODY = [
        '{{#each data}}',
        '<tr>',
        '<th nowrap="nowrap"><a href="index.php?pid={{id}}">{{addr}}</a></th>',
        '<td>{{water}}</td>',
        '<td>{{tent}}</td>',
        '<td>{{lamp}}</td>',
        '<td>{{medm}}</td>',
        '<td>{{drug}}</td>',
        '<td>{{quilt}}</td>',
        '<td>{{cloth}}</td>',
        '<td>{{com}}</td>',
        '<td>{{child}}</td>',
        '<td>{{trans}}</td>',
        '<td>{{other}}</td>',
        '<td width="80" nowrap="nowrap">{{total}} <br><a class="admin" href="record.php?pid={{pid}}&id={{id}}">编辑</a></td>',
        '</tr>',
        '{{/each}}'
    ].join('');
    var DATA = {header: [
        {name: '食物、水'},
        {name: '帐篷防水布'},
        {name: '照明'},
        {name: '发电'},
        {name: '医药器械'},
        {name: '药品'},
        {name: '棉被、棉絮'},
        {name: '衣物'},
        {name: '通信'},
        {name: '儿童用品/卫生用品'},
        {name: '运输'},
        {name: '其他'},
        {name: '总计'}
    ], data: []};

    var params = S.unparam(document.location.search.substring(1));
    var pid = params.pid ? params.pid : 0;
    var token = params.token ? params.token : '';
    if (token) {
        //document.cookie = 'token=' + token;
        Cookie.set('token', token);
    }
    var isAdmin = !!Cookie.get('token');
    //console.log(Cookie.get('token'), isAdmin);

    // list
    S.ajax({
            type: "get",
            dataType: "json",
            url: 'ajax.php',
            data: {
                func: 'getRecords',
                pid: pid
            },
            success: function(data) {
                if (!data) {
                    return;
                }
                var rec;
                for (var i = 0; i < data.length; ++i) {
                    rec = data[i];
                    rec.total = parseInt(rec.water, 10) + parseInt(rec.tent, 10) + parseInt(rec.lamp, 10)
                        + parseInt(rec.medm, 10) + parseInt(rec.drug, 10) + parseInt(rec.quilt, 10)
                        + parseInt(rec.cloth, 10) + parseInt(rec.com, 10)
                        + parseInt(rec.child, 10) + parseInt(rec.trans, 10) + parseInt(rec.other, 10);
                }
                DATA.data = data;

                var html = [];
                html.push('<table>');
                html.push('<thead>');
                html.push(new XTemplate(THEAD).render(DATA));
                html.push('</thead>');
                html.push('<tbody>');
                html.push(new XTemplate(TBODY).render(DATA));
                html.push('</tbody>');
                html.push('</table>');
                S.one('#wz').html(html.join(''));

                if (isAdmin) {
                    S.all('.admin').show();
                }
            },
            timeout: 10,
            error: function(textStatus) {
                console.log('error: ', textStatus);
            }
        }
    );

    // parent info
    if (pid > 0) {
        S.ajax({
                type: "get",
                dataType: "json",
                url: 'ajax.php',
                data: {
                    func: 'getRecord',
                    id: pid
                },
                success: function(record) {
                    console.log(record);
                    if (!record) {
                        return;
                    }
                    S.one('#title').html(record.addr + ' <a href="index.php?pid=' + record.pid + '">所有地域</a> ');
                },
                timeout: 10,
                error: function(textStatus) {
                    console.log('error: ', textStatus);
                }
            }
        );
    } else {
        S.one('#title').html('所有地域');
    }

    S.one('#add').on('click', function() {
        location.href = 'record.php?pid=' + pid;
    });
});
