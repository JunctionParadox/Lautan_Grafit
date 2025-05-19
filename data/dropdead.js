const mysql = require('mysql2');

const con = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASS
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connection succesfull");
	con.query("DROP TABLE grafitdb.images", function (err, result) {
		if (err) throw err;
		console.log("Table deleted");
	});
});