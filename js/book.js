function bookCipher(tString, kString, reverse) {
    tString = tString.toLowerCase();
    var text = "";

    if (reverse) {
        text += decypherText(tString, kString);
        document.getElementById("resultDecrypt").value = text;
    } else {
        text += cypherText(tString, kString);
        document.getElementById("result").value = text;
    }
};


function cypherText(tString, kString) {
	var text = tString.split("");
	var cypheredText = "";
	for (var i = 0, x = text.length; i < x; i++) {
		cypheredText += cypherLetter(text[i], kString);
	}
	return cypheredText.substring(0, cypheredText.length - 1)
}


function decypherText(tString, kString) {
	var text = tString.split(" ");
	var decypheredText = "";
	for (var i = 0, x = text.length; i < x; i++) {
		decypheredText += kString.charAt(text[i] - 1);
	}
	return decypheredText
}


function cypherLetter(letter, key) {
	var cryptic = key.split("");
	for (var i = 0, x = cryptic.length; i < x; i++) {
		if (letter === cryptic[i]){
			return (i + 1) + " ";
		}
	}
}



$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');
    let key = document.getElementById('key');
    let keyDecrypt = document.getElementById('keyDecrypt');

    $('#text').keypress(function() {
        setTimeout(function() { bookCipher(text.value, key.value, false); }, 20);
    });
    $('#text').change(function() {
        setTimeout(bookCipher(text.value, key.value, false), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { bookCipher(textDecrypt.value, keyDecrypt.value, true); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(bookCipher(textDecrypt.value, keyDecrypt.value, true), 20);
    });
});
