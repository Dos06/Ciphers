function dh(props) {
    if (props.reverse && props.step === 1) {
        let text = decrypt(props.textDecrypt, props.text, props.key2);
        document.getElementById("resultDecrypt1").value = text;
    } else if (props.reverse) {
        let text = decrypt(props.partnerKey, props.text, props.key2);
        document.getElementById('resultDecrypt2').value = text;
    } else {
        let text = encrypt(props.text, props.key1, props.key2);
        document.getElementById("result").value = text;
    }
}

function encrypt(privateKey, p, q) {
    let result = Math.pow(p, privateKey) % q;
    return result;
};


function decrypt(sharedKey, privateKey, q) {
    let result = Math.pow(sharedKey, privateKey) % q;
    return result;
}


$(document).ready(function() {
    let text = document.getElementById('text');
    let textDecrypt = document.getElementById('textDecrypt');
    let key1 = document.getElementById('key1');
    let key2 = document.getElementById('key2');
    let partnerKey = document.getElementById('partnerKey');

    function run(reverse, step) {
        let props = {
            text: parseInt(text.value),
            textDecrypt: parseInt(textDecrypt.value),
            key1: parseInt(key1.value),
            key2: parseInt(key2.value),
            partnerKey: parseInt(partnerKey.value)
        }
        if (reverse) {
            props.step = step;
            props.reverse = true;
        } else {
            props.reverse = false;
        }
        console.log(props);
        dh(props);
    }


    $('#text').keypress(function() {
        setTimeout(function() { run(false); }, 20);
    });
    $('#text').change(function() {
        setTimeout(run(false), 20);
    });
    
    $('#textDecrypt').keypress(function() {
        setTimeout(function() { run(true, 1); }, 20);
    });
    $('#textDecrypt').change(function() {
        setTimeout(run(true, 1), 20);
    });
    
    $('#partnerKey').keypress(function() {
        setTimeout(function() { run(true); }, 20);
    });
    $('#partnerKey').change(function() {
        setTimeout(run(true), 20);
    });
});
