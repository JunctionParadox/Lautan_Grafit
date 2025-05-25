const fs = require('fs').promises;
const path = require('path');
const { blob } = require('buffer');

//openAsBlob is mogelijk alternatief
module.exports = function loadImage(url) {
    return new Promise((resolve, reject) => {
        const file = fs.readFile(__dirname + "\\" + url + ".png", {encoding: "base64"});
        if (file) {
            resolve(file);
        }
        else {
            reject(new Error ("File could not be loaded"))
        }
    })
}