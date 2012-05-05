var mysql = require('mysql');

var TEST_DATABASE = 'nodejs_mysql_test';
var TEST_TABLE = 'test';

var client = mysql.createClient({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'123456',
    database:'vcom'
});

client.query(
    'INSERT INTO ' + TEST_TABLE + ' ' +
        'SET title = ?, text = ?, created = ?',
    ['super cool', 'this is a nice text', '2010-08-16 10:00:23']
);

var query = client.query(
    'INSERT INTO ' + TEST_TABLE + ' ' +
        'SET title = ?, text = ?, created = ?',
    ['another entry', 'because 2 entries make a better test', '2010-08-16 12:42:15']
);

client.query(
    'SELECT * FROM ' + TEST_TABLE,
    function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }

        console.log('results', results.length);
        results.forEach(function (result) {
            console.log(result);
        });

        console.log('fields', fields);
        client.end();
    }
);