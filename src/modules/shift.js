export const shiftAlphabet = (shift, alphabet) => {
    var shiftedAlphabet = '';
    for (var i = 0; i < alphabet.length; i++) {
        var currentLetter = (alphabet[i + shift] === undefined) ? (alphabet[i + shift - alphabet.length]) : (alphabet[i + shift]); //Текущая буква со сдвигом, если выходим за рамки длины алфавита - берем с начала алфавита

        shiftedAlphabet = shiftedAlphabet.concat(currentLetter);
    }
    return shiftedAlphabet;
}