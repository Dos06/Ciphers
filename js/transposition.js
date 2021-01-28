function myCTCipher(tString, kString, reverse) {
    var text = "";

    if (reverse) {
        text += decryptCT(tString, kString);
        document.getElementById("resultDecrypt").value = text;
    } else {
        text += encryptCT(tString, kString);
        document.getElementById("result").value = text;
    }
};


function decryptCT(cipher, k) {
    var ranking = rankLetters(k);
    var cLength = cipher.length;
    var kLength = k.length;
    var complete = cLength % kLength;
    var shortLength = ~~(cLength / kLength);
    var newColumns = [];
    var total = 0, cur, i = 0, j, curCol;
    while (total < cLength) {
        if (ranking.indexOf(i) + 1 <= complete) {
            cur = shortLength + 1;
        } else {
            cur = shortLength;
        }
        curCol = [];
        for (j = 0; j < cur; j++) {
            curCol.push(cipher.charAt(total + j));
        }
        newColumns.push(curCol);
        total += cur;
    }
    var oldColumns = [];
    for (i = 0; i < kLength; i++) {
        oldColumns.push(newColumns[ranking.indexOf(i)]);
    }
    var text = "";
    for (i = 0; i < shortLength; i++) {
        for (j = 0; j < kLength; j++) {
            text += oldColumns[j][i];
        }
    }
    for (j = 0; j < kLength; j++) {
        if (oldColumns[j].length > shortLength) {
            text += oldColumns[j][shortLength];
        } else {
            break;
        }
    }
    return text;
}


function encryptCT(plain, k) {
    var kLength = k.length;
    var pLength = plain.length;
    var columns = [], i, j = 0;
    for (i = 0; i < kLength; i++) {
        columns.push([]);
    }
    for (i = 0; i < pLength; i++) {
        columns[j].push(plain.charAt(i));
        j += 1;
        j %= kLength;
    }
    var ranking = rankLetters(k);
    var text = "";
    for (i = 0; i < kLength; i++) {
        text += columns[ranking[i]].join("");
    }
    return text;
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


// Greatest Common divisor
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
        if (bin[bin.length - i - 1] == "1") {
            t *= powers[i];
            t %= mod;
        };
    };
    return t;
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


function modInv(a, mod) {
    if (myGCD(a, mod) != 1) {
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


function valLetters(lString) {
    var nString = lString.toLowerCase();
    var lValues = [], char;
    for (var i = 0; i < nString.length; i++) {
        char = nString.charAt(i);
        lValues.push(char.charCodeAt() - 97);
    };
    return lValues;
}


function valLetter(lString, i) {
    var char = lString.charAt(i);
    char = char.toLowerCase();
    return char.charCodeAt() - 97;
}


function rankLetters(lString) {
    var nString = lString.toLowerCase();
    var l = nString.length;
    var indices = [];
    var i;
    for (i = 0; i < l; i++) {
        indices.push(i);
    };
    indices.sort((j, k) => valLetter(nString, j) - valLetter(nString, k));
    return indices;
}


$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');
    let key = document.getElementById('key');
    let keyDecrypt = document.getElementById('keyDecrypt');

    $('#text').keypress(function() {
        setTimeout(function() { myCTCipher(text.value, key.value, false); }, 20);
    });
    $('#text').change(function() {
        setTimeout(myCTCipher(text.value, key.value, false), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { myCTCipher(textDecrypt.value, keyDecrypt.value, true); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(myCTCipher(textDecrypt.value, keyDecrypt.value, true), 20);
    });
});
