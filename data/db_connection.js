const mysql = require('mysql2');

module.exports  = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)