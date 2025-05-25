const fs = require('fs');
const path = require('path');
const directory = path.join(__dirname, 'images');
const con = require('../../data/db_connection');

module.exports = function storeImage(image, url) {
	var fileName = url.replace("/images/", "\\")
	var filePath = directory + fileName + ".png";
	console.log(directory + fileName + ".png")
	try {
		var imageFile = image.replace(/^data:image\/png;base64,/, "")
		fs.writeFileSync(filePath, imageFile, 'base64');
		con.connect(function(err) {
			if (err) throw err;
			console.log("Connection succesfull");
			var query = 'INSERT INTO images VALUES (0, "' + fileName + '")';
			con.query(query, function (err, result) {
				if (err) throw err;
				console.log("Record inserted succesfully");
			});
		});
	} catch (error) {
		console.log(error)
	}
}