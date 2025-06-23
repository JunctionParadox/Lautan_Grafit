const con = require('../../data/db_connection');
const errorstatus = require('../auth/errorstatus');
const jose = require('jose');

module.exports = function checkauthtoken(cookie) {
    return new Promise(async (resolve, reject) => {
        try {
            const algorithm = 'RSA-OAEP-256';
            const privateKey = await jose.importPKCS8(process.env.RSA_PRIVATEKEY, algorithm);
            const token = await jose.compactDecrypt(cookie, privateKey);
            resolve(checkUser(new TextDecoder().decode(token['plaintext'])))
        }
        catch (err) {
            reject(new errorstatus.UnauthorizedError('No proper token provided'))
        }
    })
}

async function checkUser(user) {
    return new Promise(async (resolve, reject) => {
        const username = JSON.parse(user)['user'];
        const id = JSON.parse(user)['id'];
        var query = `SELECT * FROM users WHERE name = "${username}"`;
        con.query(query, function (err, result) {
            if (err) {
                reject(new errorstatus.UnauthorizedError('You are not authorized to make this request'));
            }
            else if (!(result  && result.length > 0)) {
                reject(new errorstatus.NotFoundError('Incorrect credentials'));
            }
            else {
                resolve(id);
            }
        })
    })
}