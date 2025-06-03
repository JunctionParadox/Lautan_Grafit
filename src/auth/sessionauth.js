const con = require('../../data/db_connection');

module.exports = function checkSessionId(id) {
    return new Promise((resolve, reject) => {
        var counter = Number(charAt(id.length - 1));
        var base = Number(id.slice(0, -1));
        var modified = (base * counter).toString() + counter;
        var query = `SELECT * FROM tokens WHERE value=${modified}`;
        con.query(query, function (err, result) {
            if (err) {
                reject(err)
            }
            else if (result != {}) {
                resolve(true)
            }
            else {
                resolve(false);
            }
        })
    })
}