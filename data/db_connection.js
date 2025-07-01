const mysql = require('mysql2');

if(process.env.DEV_MODE === 'true') {
	require('dotenv').config();
	module.exports  = mysql.createConnection({
		host: "localhost",
		user: process.env.DB_USER,
		password: process.env.DB_PASS,
		database: process.env.DB_NAME
	});

console.log(process.env.DB_USER)
console.log(process.env.DB_PASS)
}