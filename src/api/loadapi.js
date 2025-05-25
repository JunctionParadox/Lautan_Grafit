const con = require('../../data/db_connection');

module.exports = function deadFlash() {
	return new Promise((resolve, reject) => {
		var query = 'SELECT path FROM grafitdb.images';
		con.query(query, function (err, result) {
			if (err) {
				reject(err)
			}
			else {
				resolve(result);
			}
		})
	})
}