let alphabet = "abcdefghijklmnopqrstuvwxyz";
let fullAlphabet = alphabet + alphabet + alphabet;

function encrypt() {
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;
    key = (key % alphabet.length);
    let result = '';

    for(i = 0; i < text.length; i++) {
        let letter = text.charAt(i);
        let index = alphabet.indexOf(letter);
        if (index == -1){
            result += letter;
        } else {
            index = ((index + key) + alphabet.length);
            let nextLetter = fullAlphabet[index];
            result += nextLetter;
        }
    }
    document.getElementById('result').value = result;
}

function decrypt() {
    let text = document.getElementById('textDecrypt').value;
    let key = document.getElementById('keyDecrypt').value;
    key = (key % alphabet.length);
    let result = '';

    for (i = 0; i < text.length; i++) {
        let letter = text.charAt(i);
        let index = alphabet.indexOf(letter);
        let cipherIndex = index -+ key;

        if (index != -1) {
            if (cipherIndex < 0) {
                cipherIndex = cipherIndex + 26;
            }
            result += alphabet.charAt(cipherIndex);
        } else {
            if (result == " ") {
                result += " ";
            } else {
                result += letter;
            }
        }
    }
    document.getElementById('resultDecrypt').value = result;
}

$(document).ready(function() {
    $('#text').keypress(function() {
        setTimeout(function(){ encrypt(); }, 20);
    });
    $('#text').change(function() {
        setTimeout(encrypt(), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function(){ decrypt(); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(decrypt(), 20);
    });
});
