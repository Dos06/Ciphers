function myPlayfairCipher(tString, kString, reverse) {
    tString = tString.replace(/\s/g, '');
    var text = "";

    if (reverse) {
        text += decryptPlayfair(tString, kString);
        document.getElementById("resultDecrypt").value = text;
    } else {
        text += encryptPlayfair(tString, kString);
        document.getElementById("result").value = text;
    }
};


function encryptPlayfair(plain, k) {
    var newP = makePlayfairReducedPlaintext(plain);
    var grid = makePlayfairGrid(k);
    var text = "";
    for (var i = 0; i < newP.length; i += 2) {
        text += encryptPlayfairPair(newP.charAt(i),newP.charAt(i + 1), grid);
    }
    return text;
}


function decryptPlayfair(cipher, k) {
    var grid = makePlayfairGrid(k);
    var text = "";
    for (var i = 0; i < cipher.length; i += 2) {
        text += decryptPlayfairPair(cipher.charAt(i),cipher.charAt(i + 1),grid);
    }
    return text;
}


function encryptPlayfairPair(a, b, grid) {
    var ai = grid.indexOf(a);
    var bi = grid.indexOf(b);
    var ar, br;
    var ac = ai % 5;
    var bc = bi % 5;
    if (ac == bc) {
        ai = (ai + 5) % 25;
        bi = (bi+5) % 25;
        return grid.charAt(ai) + grid.charAt(bi);
    }
    for (var i = 0; i < 5; i++) {
        if (inRange(ai, 5 * i, 5 * i + 4)) {
            ar = i;
        }
        if (inRange(bi, 5 * i, 5 * i + 4)) {
            br = i;
        }
    }
    if (ar == br) {
        ai = (ai - ai % 5) + (ai + 1) % 5;
        bi = (bi - bi % 5) + (bi + 1) % 5;
        return grid.charAt(ai) + grid.charAt(bi);
    }
    ai = ar * 5 + bc;
    bi = br * 5 + ac;
    return grid.charAt(ai) + grid.charAt(bi);
}


function decryptPlayfairPair(a, b, grid) {
    var ai = grid.indexOf(a);
    var bi = grid.indexOf(b);
    var ar, br;
    var ac = ai % 5;
    var bc = bi % 5;
    if (ac == bc) {
        ai = (ai - 5) % 25;
        bi = (bi - 5) % 25;
        return grid.charAt(ai) + grid.charAt(bi);
    }
    for (var i = 0; i < 5; i++) {
        if (inRange(ai, 5 * i, 5 * i + 4)) {
            ar = i;
        }
        if (inRange(bi, 5 * i, 5 * i + 4)) {
            br = i;
        }
    }
    if (ar == br) {
        ai = (ai - ai % 5) + modGreater(ai, 1, 5);
        bi = (bi - bi % 5) + modGreater(bi, 1, 5);
        return grid.charAt(ai) + grid.charAt(bi);
    }
    ai = ar * 5 + bc;
    bi = br * 5 + ac;
    return grid.charAt(ai) + grid.charAt(bi);
}


function makePlayfairReducedPlaintext(plain) {
    var lowerPlain = plain.toLowerCase();
    for (i = 0; i < lowerPlain.length; i += 2) {
        if (lowerPlain.charAt(i) == lowerPlain.charAt(i + 1)) {
            if (lowerPlain.charAt(i) != "x") {
                lowerPlain = stringInsert(lowerPlain, i + 1, "x");
            } else {
                lowerPlain = stringInsert(lowerPlain, i + 1, "z");
            }
        }
    }
    var l = lowerPlain.length;
    if (l % 2 == 1) {
        if (lowerPlain.charAt(l - 1) != "x") {
            lowerPlain += "x";
        } else {
            lowerPlain += "z";
        }
        l += 1;
    }
    return lowerPlain;
}


function makePlayfairGrid(key) {
    var grid = "";
    var character, i;
    for (i = 0; i < key.length; i++) {
        character = key.charAt(i);
        character = character.toLowerCase();
        if (!(grid.includes(character))) {
            if (character == 'j') {
                if (!grid.includes('i')) {
                    grid += 'i';
                }
            } else {
                grid += character;
            }
        }
    }
    var alphabet = 'abcdefghiklmnopqrstuvwxyz';
    var reducedAlphabet = "";
    for (i = 0; i < 25; i++) {
        character = alphabet.charAt(i);
        if (!(grid.includes(character))) {
            reducedAlphabet += character;
        }
    }
    return grid + reducedAlphabet;
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




$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');
    let key = document.getElementById('key');
    let keyDecrypt = document.getElementById('keyDecrypt');

    $('#text').keypress(function() {
        setTimeout(function() { myPlayfairCipher(text.value, key.value, false); }, 20);
    });
    $('#text').change(function() {
        setTimeout(myPlayfairCipher(text.value, key.value, false), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { myPlayfairCipher(textDecrypt.value, keyDecrypt.value, true); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(myPlayfairCipher(textDecrypt.value, keyDecrypt.value, true), 20);
    });
});
