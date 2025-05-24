const fs = require('fs').promises;
const path = require('path');
const { blob } = require('buffer');
const directory = path.join(__dirname, 'images');

//openAsBlob is mogelijk alternatief
module.exports = function loadImage() {
    return new Promise((resolve, reject) => {
        const file = fs.readFile(directory + "\\Syzygy.png", {encoding: "base64"});
        if (file) {
            resolve(file);
        }
        else {
            reject(new Error ("File could not be loaded"))
        }
    })
}