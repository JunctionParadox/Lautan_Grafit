const bcrypt = require('bcrypt');
const crypto = require('crypto');
const con = require('../../data/db_connection');

module.exports = function generateSessionToken() {
    return new Promise((resolve, reject) => {
        var base = crypto.randomInt(10000000, 99999999);
        var kaprekar = crypto.randomInt(1000, 9998);
        while (kaprekar == 1111 || kaprekar == 2222 || kaprekar == 3333 || kaprekar == 4444 || kaprekar == 5555 || kaprekar == 6666 || kaprekar == 7777 || kaprekar == 8888)
        {
            console.log(555)
            kaprekar = crypto.randomInt(1000, 9998);
        }
        var counter = 0
        while (kaprekar != 6174)
        {
            console.log(kaprekar)
            var low = kaprekar.toString().split('').sort().join('');
            var high = kaprekar.toString().split('').sort().reverse().join('');
            kaprekar = high - low;
            counter++;
        }
        
        if(base) {
            resolve(storeSession(base, counter))
        }
        else {
            reject(new Error ("Token could not be generated"))
        }
    })
}

function storeSession(base, counter) {
    var modified = (base * counter).toString() + counter;
    con.connect(function(err) {
        if (err) throw err;
        var query = `INSERT INTO tokens VALUES (0, ${modified})`;
        con.query(query, function (err, result) {
            if (err) throw err;
            console.log("Record inserted succesfully");
        });
    });

    final = (base).toString() + counter;
    console.log(final)
    return final;
}