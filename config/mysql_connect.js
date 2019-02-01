// mysql
const mysql = require('mysql');
const db = require('./database')
console.log('Get connection ...');

var conn = mysql.createConnection(db.confige);
conn.connect(function(err) {
					if (err) throw err;
					console.log("Connected!");
});

module.exports = conn;
