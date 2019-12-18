import { shiftAlphabet } from "./shift";

export const encrypt = (message, shift, alphabet) => {

    var shiftedAlphabet = shiftAlphabet(shift, alphabet);
    var encryptedMessage = '';

    for (var i = 0; i < message.length; i++) {
        if (!alphabet.includes(message[i].toUpperCase())) {
            encryptedMessage = encryptedMessage.concat(' ');
            continue
        };
        var indexOfLetter = alphabet.indexOf(message[i].toUpperCase());
        encryptedMessage = encryptedMessage.concat(shiftedAlphabet[indexOfLetter]);
    }
    
    return encryptedMessage.toLowerCase();
}