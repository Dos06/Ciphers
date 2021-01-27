let alphabet = "abcdefghijklmnopqrstuvwxyz";
let fullAlphabet = alphabet + alphabet + alphabet;

function runCipher(){
    let text = document.getElementById('text').value;
    let key = document.getElementById('key').value;
    key = (key % alphabet.length);
    let result = '';

    for(i = 0; i < text.length; i++){
        let letter = text[i];
        
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

$(document).ready(function() {
    $('#text').keypress(function(){
        setTimeout(function(){ runCipher(); }, 20);
    });
    $('#text').change(function(){
        setTimeout(runCipher(), 20);
    });
});