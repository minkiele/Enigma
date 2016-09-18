const A_INDEX = 'A'.charCodeAt(0);

function getNextLetter (currentLetter) {
    var currentIndex = currentLetter.charCodeAt(0) - A_INDEX;
    var nextIndex = (currentIndex + 1) % 26;
    return String.fromCharCode(nextIndex + A_INDEX);
}

export {A_INDEX, getNextLetter};
