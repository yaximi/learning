const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'test'
});

db.query('SELECT * FROM `user_table`;', (err, data) => {
    if (err) {
        console.info('error:', err);
    } else {
        console.info('success:', data);
    }
});