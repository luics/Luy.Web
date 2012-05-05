var mysql = require('mysql');

var TEST_DATABASE = 'nodejs_mysql_test';
var TEST_TABLE = 'test';

var client = mysql.createClient({
    user:'root',
    password:'123456'
});

client.query('CREATE DATABASE ' + TEST_DATABASE, function (err) {
    if (err && err.number != mysql.ERROR_DB_CREATE_EXISTS) {
        throw err;
    }
});

// If no callback is provided, any errors will be emitted as `'error'`
// events by the client
client.query('USE ' + TEST_DATABASE);

client.query(
    'CREATE TEMPORARY TABLE ' + TEST_TABLE +
        '(id INT(11) AUTO_INCREMENT, ' +
        'title VARCHAR(255), ' +
        'text TEXT, ' +
        'created DATETIME, ' +
        'PRIMARY KEY (id))'
);

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