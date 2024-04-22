function caesarCipherEncrypt(message, password) {
    password = password.toLowerCase(); // Convert password to lowercase
    if (password !== "fat") {
        alert("OJ hej, det här är bara en Matte site för att hjälpa dig med Matte. Du kan inte enkryptera något här. *wink* *wink*");
        return;
    }
    var shift = Math.floor(Math.random() * 25) + 1;  // Generate a random shift value between 1 and 25
    var encryptedMessage = "";
    for (var i = 0; i < message.length; i++) {
        var char = message[i];
        if (/[a-zA-Z]/.test(char)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.toLowerCase().charCodeAt(0);
            var shiftedCharCode;
            if (char === 'å') {
                shiftedCharCode = (charCode - 229 + shift) % 26 + 229;
            } else if (char === 'ä') {
                shiftedCharCode = (charCode - 228 + shift) % 26 + 228;
            } else if (char === 'ö') {
                shiftedCharCode = (charCode - 246 + shift) % 26 + 246;
            } else {
                shiftedCharCode = (charCode - 97 + shift) % 26 + 97;
            }
            var shiftedChar = String.fromCharCode(shiftedCharCode).toUpperCase();
            encryptedMessage += isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
        } else if (/[0-9]/.test(char)) {
            var digit = parseInt(char);
            var encryptedDigit = (digit + 1) % 10; // Encrypt number by adding 1 and wrapping around if necessary
            encryptedMessage += encryptedDigit.toString();
        } else {
            encryptedMessage += char;
        }
    }
    // Encrypt the shift value
    var encryptedShift = String.fromCharCode((shift + 65) % 26 + 65);
    encryptedMessage += encryptedShift;  // Add the encrypted shift value
    
    // Reset password field
    document.getElementById('password').value = "";
    
    return encryptedMessage;
}

function caesarCipherDecrypt(encryptedMessage, password) {
    password = password.toLowerCase(); // Convert password to lowercase
    if (password !== "fat") {
        alert("Oh hello there!, this is just a Math site to help you with Math.(Contact me for the pass)");
        return;
    }
    var message = encryptedMessage.slice(0, -1);  // Remove the encrypted shift value from the end
    var encryptedShift = encryptedMessage.slice(-1);  // Extract the encrypted shift value
    var shift = (encryptedShift.charCodeAt(0) - 65 - 65) % 26;  // Decrypt the shift value
    var decryptedMessage = "";
    for (var i = 0; i < message.length; i++) {
        var char = message[i];
        if (/[a-zA-Z]/.test(char)) {
            var isUpperCase = char === char.toUpperCase();
            var charCode = char.toLowerCase().charCodeAt(0);
            var shiftedCharCode;
            if (char === 'å') {
                shiftedCharCode = (charCode - 229 - shift + 26) % 26 + 229;
            } else if (char === 'ä') {
                shiftedCharCode = (charCode - 228 - shift + 26) % 26 + 228;
            } else if (char === 'ö') {
                shiftedCharCode = (charCode - 246 - shift + 26) % 26 + 246;
            } else {
                shiftedCharCode = (charCode - 97 - shift + 26) % 26 + 97;
            }
            var shiftedChar = String.fromCharCode(shiftedCharCode).toUpperCase();
            decryptedMessage += isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
        } else if (/[0-9]/.test(char)) {
            var digit = parseInt(char);
            var decryptedDigit = (digit + 9) % 10; // Decrypt number by subtracting 1 and wrapping around if necessary
            decryptedMessage += decryptedDigit.toString();
        } else {
            decryptedMessage += char;
        }
    }

    // Reset password field
    document.getElementById('password').value = "";
    
    return decryptedMessage;
}

function encryptOrDecrypt(mode) {
    var message = document.getElementById('message').value;
    var password = document.getElementById('password').value;
    var result;
    if (mode === 'encrypt') {
        result = caesarCipherEncrypt(message, password);
    } else if (mode === 'decrypt') {
        result = caesarCipherDecrypt(message, password);
    }
    if (result !== undefined) {
        document.getElementById('result').textContent = result;
    }
}
