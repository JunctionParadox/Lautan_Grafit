const mysql = require('mysql2');

const con = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connection succesfull");
	con.query("CREATE DATABASE IF NOT EXISTS grafitdb", function (err, result) {
		if (err) throw err;
		console.log("Database created");
	});
	con.query("CREATE TABLE IF NOT EXISTS grafitdb.images (id int AUTO_INCREMENT PRIMARY KEY, path VARCHAR(255) NOT NULL)", 
	function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
	con.query("CREATE TABLE IF NOT EXISTS grafitdb.tokens (id int AUTO_INCREMENT PRIMARY KEY, value VARCHAR(255) NOT NULL)", 
	function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
	con.query("CREATE TABLE IF NOT EXISTS grafitdb.tempimages (id int AUTO_INCREMENT PRIMARY KEY, filename VARCHAR(255) NOT NULL)", 
	function (err, result) {
		if (err) throw err;
		console.log("Table created");
	});
});