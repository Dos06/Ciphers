let Vigenere = (function() {
    let AcharCode = 'A'.charCodeAt(0);
    let ZcharCode = 'Z'.charCodeAt(0);
    let alphabetLength = ZcharCode - AcharCode + 1;
    
    function encrypt(text, key, reverse) { 
        let result = '';
        let encriptionDir = reverse ? (-1 * alphabetLength) : 0;
        
        for (i = 0; i < text.length; i++) {
            let letter = text.charAt(i).toUpperCase();
            if (letter.match(/\s/)) {
                result += letter;
                continue;
            }
            let keyLetter = key.charAt(i % key.length).toUpperCase();
            let vigenereOffset = keyLetter.charCodeAt(0) - AcharCode;
            let encLetterOffset = (letter.charCodeAt(0) - AcharCode + Math.abs(encriptionDir + vigenereOffset)) % alphabetLength;
            
            result += String.fromCharCode(AcharCode + encLetterOffset);          
        }
        return result;
    }
    
    return {
        encrypt : function(text, key) {
            let result = encrypt(text, key, false);
            document.getElementById('result').value = result;
            return result;
        },
        
        decrypt : function(text, key) {
            let result = encrypt(text, key, true);
            document.getElementById('resultDecrypt').value = result;
            return result;
        }
    };  
})();


$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');
    let key = document.getElementById('key');
    let keyDecrypt = document.getElementById('keyDecrypt');

    $('#text').keypress(function() {
        setTimeout(function() { Vigenere.encrypt(text.value, key.value); }, 20);
    });
    $('#text').change(function() {
        setTimeout(Vigenere.encrypt(text.value, key.value), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { Vigenere.decrypt(textDecrypt.value, keyDecrypt.value); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(Vigenere.decrypt(textDecrypt.value, keyDecrypt.value), 20);
    });
});
