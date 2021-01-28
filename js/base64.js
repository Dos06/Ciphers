function myBase64Cipher(tString, reverse) {
    var text = "";

    if (reverse) {
        text += decryptBase64(tString);
        document.getElementById("resultDecrypt").value = text;
    } else {
        text += encryptBase64(tString);
        document.getElementById("result").value = text;
    }
};

function decryptBase64(cipherText) {
    return atob(cipherText);
}

function encryptBase64(plainText) {
    return btoa(plainText);
}



$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');

    $('#text').keypress(function() {
        setTimeout(function() { myBase64Cipher(text.value, false); }, 20);
    });
    $('#text').change(function() {
        setTimeout(myBase64Cipher(text.value, false), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { myBase64Cipher(textDecrypt.value, true); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(myBase64Cipher(textDecrypt.value, true), 20);
    });
});
