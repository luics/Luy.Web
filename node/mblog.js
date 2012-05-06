var mysql = require('mysql'),
    fs = require('fs'),
    util = require('util'),
    DB_MBLOG = 'mblog',
    TB_USER = {name:'user', users:200, posts:10},
    TB_POST = {name:'post', comments:10},
    TB_COMMENT = {name:'comment'},
    LOOP = 2, // Total: TB_USER.users * TB_USER.posts * TB_POST.comments * LOOP
    LABEL = 'DATA_INIT',
    TBS = [TB_USER, TB_POST, TB_COMMENT];

var client = mysql.createClient({
    user:'root',
    password:'123456',
    database:DB_MBLOG
});

/**
 * mysql module 目前有单次请求包局限为16MB，可考虑多次运行init
 */
var LAST_USER_ID = 1,
    LAST_POST_ID = 1;
function init(index, onready) {
    var tag = '[' + index + '] ';

    /******************************/
    var values = [], i, j, k;
    for (i = 0; i < TB_USER.users; ++i) {
        var uid = LAST_USER_ID + i;
        var name = 'user' + uid;
        values.push(client.format('(?, ?, ?, ?, ?, ?)', [name, 20 + i % 30, '123456789012x' + uid
            , name + '@abc.com', name + ' intro', name + ' address']));
    }
    client.query('INSERT INTO user(name, age, idnum, mail, intro, address) VALUES '
        + values.join(','), function (err, info) {
        if (err) throw err;
        console.log(tag + 'INSERT user +', info.affectedRows, info.insertId);
        /******************************/
        values = [];
        for (i = 0; i < TB_USER.users; ++i) {
            for (j = 0; j < TB_USER.posts; ++j) {
                var uid = LAST_USER_ID + i;
                values.push(client.format('(?,?,?,?)', [uid, 0, 'post @user' + uid + ' #' + j, 'Android']));
            }
        }
        client.query('INSERT INTO post(user,parent,msg,src) VALUES ' + values.join(',')
            , function (err, info) {
                if (err) throw err;
                console.log(tag + 'INSERT post +', info.affectedRows, info.insertId);

                /******************************/
                values = [];
                for (i = 0; i < TB_USER.users * TB_USER.posts; ++i) {
                    var uids = [];
                    while (uids.length < TB_POST.comments) {
                        var r = LAST_USER_ID + Math.floor(TB_USER.users * Math.random());
                        if (uids.indexOf(r) < 0) {
                            uids.push(r);
                        }
                    }
                    for (j = 0; j < TB_POST.comments; ++j) {
                        var uid = uids[j],
                            pid = LAST_POST_ID + i;
                        values.push(client.format('(?,?,?)', [pid, uid, 'comment @user' + uid + ' #' + pid + ' *' + j]));
                    }
                }
                client.query('INSERT INTO comment(post,user,msg) VALUES ' + values.join(',')
                    , function (err, info) {
                        if (err) throw err;
                        console.log(tag + 'INSERT comment +', info.affectedRows, info.insertId);

                        LAST_USER_ID += TB_USER.users;
                        LAST_POST_ID += TB_USER.users * TB_USER.posts;
                        if (onready) onready();
                    });
            });
    });
}

function query(sqls, onready) {
    sqls = Array.isArray(sqls) ? sqls : sqls.split(';');
    for (var i = 0; i < sqls.length; ++i) {
        var sql = sqls[i];
        sql = sql.replace(/^\s+|\s+$/g, '').replace(/\n/g, '');
        //console.log('[sql]', sql);
        if (sql === '') {
            continue;
        }

        (function (index, sql) {
            client.query(sql, function (err) {
                if (err) throw err;

                if (arguments.length === 2) {
                    var info = arguments[1];
                    console.log(sql, '|', info.affectedRows, info.insertId, info.message);
                } else if (arguments.length === 3) {
                    var rows = arguments[1],
                        fields = arguments[2];
                    console.log(sql, '|', rows.length, (rows.length > 0 ? rows[0] : ''));
                }
                if (index === sqls.length - 1 && onready) onready();
            });
        })(i, sql);
    }
}

////delete
//var del = [];
//TBS.forEach(function (tb) {
//    del.push('DELETE FROM ' + tb.name);
//});
//query(del);

console.time(LABEL);
fs.readFile(__dirname + '/../tools/mblog/0mblog.sql', function (err, sqls) {
    if (err) throw err;
    //console.log(sql.toString());
    query(sqls.toString());

    //loose restriction
    query(['SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0',
        'SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0',
        'SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE=\'TRADITIONAL\'']);

    /**
     *  chain mode
     */
    var cursor = 0;

    function run() {
        cursor++;
        init(cursor, function () {
            if (cursor === LOOP) {
                //check
                query('SELECT COUNT(*) AS users, (SELECT COUNT(*) FROM post) AS posts, (SELECT COUNT(*) FROM comment) AS comments FROM user');

                //restore & close
                query(['SET SQL_MODE=@OLD_SQL_MODE',
                    'SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS',
                    'SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS'], function () {
                    client.destroy();
                    console.log('client.destroy()');
                    console.timeEnd(LABEL);
                });
            } else {
                run();
            }
        });
    }

    run();

//    //concurrent mode
//    for (var i = 0; i < LOOP; ++i) {
//        (function (index) {
//            init(index, function () {
//                console.log(index);
//                if (index === LOOP - 1) {
//                    //check
//                    query('SELECT COUNT(*) AS users, (SELECT COUNT(*) FROM post) AS posts, (SELECT COUNT(*) FROM comment) AS comments FROM user');
//
//                    //restore & close
//                    query(['SET SQL_MODE=@OLD_SQL_MODE',
//                        'SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS',
//                        'SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS'], function () {
//                        client.destroy();
//                        console.log('client.destroy()');
//                    });
//                }
//            });
//        })(i);
//    }
});