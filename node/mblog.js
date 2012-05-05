var mysql = require('mysql'),
    util = require('util'),
    DB_MBLOG = 'mblog',
    TB_USER = {name:'user', n:10000, posts:10},
    TB_POST = {name:'post', comments:10},
    TB_COMMENT = {name:'comment'},
    TBS = [TB_USER, TB_POST, TB_COMMENT],
    client = mysql.createClient({
        user:'root',
        password:'123456',
        database:DB_MBLOG
    });

function init() {
    console.time('delete');
    TBS.forEach(function (tb) {
        client.query('DELETE FROM ' + tb.name, function (err, info) {
            console.log('DELETE %s -', tb.name, info.affectedRows);
        });
    });
    console.timeEnd('delete');

    console.time('insert');
    var values = [], i, j;
    for (i = 0; i < TB_USER.n; ++i) {
        var index = i + 1,
            name = 'user' + index,
            age = 20 + index % 20,
            birth = 0;
        values.push(client.format('(?, ?, ?, ?, ?)', [name, age, birth, name + ' intro', name + ' address']));
    }
    client.query('INSERT INTO user(`name`, `age`, `birthday`, `intro`, `address`) VALUES '
        + values.join(','), function (err, info) {
        console.log('INSERT user +', info.affectedRows, info.insertId);

        values = [];
        var minUserId = info.insertId - TB_USER.n + 1;
        for (i = info.insertId; i >= minUserId; --i) {
            for (j = 0; j < TB_USER.posts; ++j) {
                var index = i + 1,
                    name = 'user' + index,
                    age = 20 + index % 20,
                    birth = 0,
                    intro = name + ' intro',
                    addr = name + ' address';
                values.push(client.format('(?, ?, ?, ?, ?)', [name, age, birth, intro, addr]));
            }
        }

        client.destroy();
    });
    console.timeEnd('insert');
}

init();
//client.destroy();
