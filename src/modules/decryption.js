import { shiftAlphabet } from "./shift";

const charsNumer = [5, 0, 9, 14];

const unique = (arr) => {
    let result = [];
  
    for (let str of arr) {
      if (!result.includes(str)) {
        result.push(str);
      }
    }
  
    return result;
};

const compareNumeric = (a, b) => {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
}

export const decrypt = (message, alphabet) => {

    var aEncryptedMessages = [];
    var shifts = searchShifts(message, alphabet);

    console.log(shifts);

    for(var j = 0; j < shifts.length; j++)
    {
        var shiftedAlphabet = shiftAlphabet(shifts[j], alphabet);
        var encryptedMessage = '';

        for (var i = 0; i < message.length; i++) {
            if (!alphabet.includes(message[i].toUpperCase())) {
                encryptedMessage = encryptedMessage.concat(' ');
                continue};
            var indexOfLetter = shiftedAlphabet.indexOf(message[i].toUpperCase());
            encryptedMessage = encryptedMessage.concat(alphabet[indexOfLetter]);
        }

        aEncryptedMessages.push({ msg: encryptedMessage.toLowerCase(), shift: shifts[j] });
    }

    console.log(aEncryptedMessages);

    return aEncryptedMessages;
}

const searchShifts = (message, alphabet) => {

    var frequencyChars = [], numberChars = [];

    for(var i = 0; i < alphabet.length; i++) {

        var countChar = 0;

        for(var j = 0; j < message.length; j++) {
            countChar = (alphabet[i] == message[j]) ? (countChar + 1) : (countChar);
        }

        frequencyChars.push(countChar*100/message.length);

    }

    var maxFrequency = 0;
    for(var i = 0; i < frequencyChars.length; i++) {
        if(frequencyChars[i] > maxFrequency) {
            maxFrequency = frequencyChars[i];
        }
    }

    for(var i = 0; i < frequencyChars.length; i++) {
        if(frequencyChars[i] == maxFrequency) {
            numberChars.push(i);
        }
    }

    var shifts = [];
    for(var i = 0; i < numberChars.length; i++) {
        shifts.push(Math.abs(15 - numberChars[i]));
    }

    if(shifts.length !== 1) {
        for(var i = 0; i < numberChars.length; i++) {
            charsNumer.map(item => {
                if(item - numberChars[i] !== 0) {
                    shifts.push(Math.abs(item - numberChars[i]));
                }
            });
        }
    }

    console.log(unique(shifts).sort(compareNumeric));

    return unique(shifts).sort(compareNumeric);

}