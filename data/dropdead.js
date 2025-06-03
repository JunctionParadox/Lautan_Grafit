const mysql = require('mysql2');

const con = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connection succesfull");
	con.query("DROP TABLE images", function (err, result) {
		if (err) throw err;
		console.log("Table deleted");
	});
});