const con = require('../../data/db_connection');
const jose = require('jose');

module.exports = function deadFlash(userid) {
	return new Promise(async (resolve, reject) => {
		var query = `SELECT path FROM images WHERE userId = ${userid}`;
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