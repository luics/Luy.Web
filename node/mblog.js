var mysql = require('mysql'),
    util = require('util'),
    DB_MBLOG = 'mblog',
    TB_USER = {name:'user', n:300, posts:10},
    TB_POST = {name:'post', comments:10},
    TB_COMMENT = {name:'comment'},
    TBS = [TB_USER, TB_POST, TB_COMMENT];


/**
 * mysql module 目前有单次请求包局限为16MB，可考虑多次运行init
 */
function init(tag) {
    var client = mysql.createClient({
        user:'root',
        password:'123456',
        database:DB_MBLOG
    });

    TBS.forEach(function (tb) {
        client.query('DELETE FROM ' + tb.name, function (err, info) {
            if (err) throw err;
            console.log(tag + 'DELETE %s -', tb.name, info.affectedRows);
        });
    });

    /******************************/
    var values = [], i, j, m, n , NOW = (+new Date), USEID;
    for (i = 0; i < TB_USER.n; ++i) {
        var name = '随机用户' + i,
            age = 20 + i % 30,
            birthday = NOW - 86400 * 1000 * (365 * age - Math.random() * 365);//出生年的随机天
        values.push(client.format('(?, ?, ?, ?, ?)', [name, age, birthday, name + ' intro', name + ' address']));
    }
    client.query('INSERT INTO user(name, age, birthday, intro, address) VALUES '
        + values.join(','), function (err, info) {
        if (err) throw err;
        console.log(tag + 'INSERT user +', info.affectedRows, info.insertId);
        USEID = info.insertId;
        /******************************/
        values = [];
        for (j = 0; j < TB_USER.posts; ++j) {
            for (i = 0; i < TB_USER.n; ++i) {
                values.push(client.format('(?,?,?,?)', [USEID + i, 0, '微博', 'Android']));
            }
        }
        client.query('INSERT INTO post(user,parent,msg,src) VALUES ' + values.join(',')
            , function (err, info) {
                if (err) throw err;
                console.log(tag + 'INSERT post +', info.affectedRows, info.insertId);

                /******************************/
                values = [];
                for (j = 0; j < TB_POST.comments; ++j) {
                    for (i = 0; i < TB_USER.n * TB_USER.posts; ++i) {
                        values.push(client.format('(?,?,?)', [info.insertId + Math.floor(i / TB_USER.n)
                            , USEID + Math.floor(i / TB_USER.posts), '评论']));
                    }
                }
                client.query('INSERT INTO comment(post,user,msg) VALUES ' + values.join(',')
                    , function (err, info) {
                        if (err) throw err;
                        console.log(tag + 'INSERT comment +', info.affectedRows, info.insertId);
                        //close
                        if (j >= TB_POST.comments) client.destroy();
                    });
            });
    });
}

for (var i = 0; i < 10; ++i) {
    init('[' + i + '] ');
}

/*
 SELECT COUNT(*) AS count FROM mblog.user;
 SELECT COUNT(*) AS count FROM mblog.post;
 SELECT COUNT(*) AS count FROM mblog.comment;
 */