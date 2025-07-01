const jose = require('jose');
const con = require('../../data/db_connection');
const errorstatus = require('../auth/errorstatus');

module.exports = function loginUser(form) {
    return new Promise((resolve, reject) => {
        console.log(form)
        var query = `SELECT * FROM users WHERE name = "${form.name}"`;
        con.query(query, function (err, result) {
            console.log(JSON.stringify(result))
            if (err) {
                reject(new errorstatus.BadRequestError('Bad request'))
            }
            else if (!(result  && result.length > 0)) {
                reject(new errorstatus.NotFoundError('Incorrect credentials'))
            }
            else {
                resolve((createUserToken(result)));
            }
        })
    })
}

async function createUserToken(intel) {
    const header = {
        alg: 'RSA-OAEP-256', enc: 'A256GCM' 
    };

    console.log(intel[0])

    const payload = {
        id: intel[0]['id'],
        user: intel[0]['name'],
        exp: Math.round(Date.now() /1000) + 7200
    };

    console.log(payload)
    const algorithm = 'RSA-OAEP-256'
    const publicKey = await jose.importSPKI(process.env.RSA_PUBLICKEY, algorithm)

    return await new jose.CompactEncrypt(new TextEncoder().encode(JSON.stringify(payload)))
        .setProtectedHeader(header)
        .encrypt(publicKey)
}