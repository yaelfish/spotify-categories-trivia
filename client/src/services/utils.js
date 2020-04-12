export default {
    getRandomId,
    getRandomInt,
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