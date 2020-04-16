export default {
    getRandomId,
    getRandomInt,
    generateRandomString,
    getHashParams
};

function getRandomId() {
    let letters = '1234567890poiiytreqwasdfghjklmnbvcxxssersgyushquiz';
    let id = '';
    for (let i = 0; i < 10; i++) {
        let ind = Math.floor(Math.random() * letters.length)
        id += letters[ind];
    }
    return id;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(strLength) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < strLength; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;
};

/**
* Obtains parameters from the hash of the URL
* @return Object
*/
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
        e = r.exec(q);
    }
    return hashParams;
}