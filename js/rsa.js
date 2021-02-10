let nrsa = require('node-rsa');

let key = new nrsa().generateKeyPair();
// const key = new rsa({b: 512});
let publicKey = key.exportKey('public');
let privateKey = key.exportKey('private');

document.getElementById('key').value = publicKey.replace('-----BEGIN PUBLIC KEY-----\n', '').replace('\n-----END PUBLIC KEY-----', '').replace('-----BEGIN RSA PRIVATE KEY-----\n', '').replace('\n-----END RSA PRIVATE KEY-----', '');
document.getElementById('keyDecrypt').value = privateKey.replace('-----BEGIN PUBLIC KEY-----\n', '').replace('\n-----END PUBLIC KEY-----', '').replace('-----BEGIN RSA PRIVATE KEY-----\n', '').replace('\n-----END RSA PRIVATE KEY-----', '');


function rsa(tString, reverse) {
    tString = tString.replace(/\s/g, '');
    var text = "";

    if (reverse) {
        text += decrypt(tString);
        document.getElementById("resultDecrypt").value = text;
    } else {
        text += encrypt(tString);
        document.getElementById("result").value = text;
    }
};


function encrypt(plain) {
    var text = new nrsa(publicKey).encrypt(plain, 'base64');
    return text;
};


function decrypt(cipher) {
    var text = new nrsa(privateKey).decrypt(cipher, 'utf8');
    return text;
}


function base64(text) {
    return btoa(text);
}


function unbase64(text) {
    return atob(text);
}


function modGreater(value, lowerBound, mod) {
    var v = (value - lowerBound) % mod;
    while (v < 0) {
        v += mod;
    }
    while (v >= mod) {
        v -= mod;
    }
    return v;
}


// Greatest Common Divisor
function myGCD(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (Math.min(a, b) == 0){
        return Math.max(a, b);
    }
    if (a > b) {
        return myGCD(b, a % b);
    }
    return myGCD(a, b % a);
}


function modPower(base, expo, mod) {
    var e = 1;
    var p = base;
    var powers = [];
    while (e <= expo) {
        p %= mod;
        powers.push(p);
        e *= 2;
        p *= p;
    }
    var bin = expo.toString(2);
    var t = 1;
    for (i = 0; i < bin.length; i++) {
        if (bin[bin.length - i - 1] == '1') {
            t *= powers[i];
            t %= mod;
        };
    };
    return t;
}


function modInv(a, mod) {
    if(myGCD(a, mod) != 1) {
        return -1;
    }
    t = totient(mod);
    return modPower(a, t - 1, mod);
}


function invertString(myString) {
    var text = "";
    for (var i = 0; i < myString.length; i++) {
        character = myString.charCodeAt(i);
        if (65 <= character && character <= 90) {
            if (character != 65) {
                text += String.fromCharCode(156 - character);
            } else {
                text += String.fromCharCode(65);
            }
        } else if (97 <= character && character <= 122) {
            if (character != 97) {
                text += String.fromCharCode(220 - character);
            } else {
                text += String.fromCharCode(97);
            }
        } else {
            return -1;
        }
    }
    return text;
}


function stringInsert(myString, i, v) {
    return myString.substring(0, i) + v + myString.substring(i);
}


function inRange(value, low, high) {
    return !(value < low || value > high);
}


function inRangeList(list, low, high) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] < low || list[i] > high) {
            return false;
        }
    }
    return true;
}


function factorize(n) {
    var i = 2;
    primes = [];
    expos = [];
    var e;
    while (i <= Math.sqrt(n)) {
        if (n % i == 0) {
            primes.push(i);
            e = 0;
            while (n % i == 0) {
                n /= i;
                e += 1;
            }
            expos.push(e);
        }
        i += 1;
    }
    if (n > 1) {
        primes.push(n);
        expos.push(1);
    }
    return [primes,expos];
}


function totient(n) {
    p = factorize(n)[0];
    p.forEach((x) => {
        n *= (x - 1);
        n /= x;
    });
    return n;
}



$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');

    $('#text').keypress(function() {
        setTimeout(function() { rsa(text.value, false); }, 20);
    });
    $('#text').change(function() {
        setTimeout(rsa(text.value, false), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { rsa(textDecrypt.value, true); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(rsa(textDecrypt.value, true), 20);
    });
});
