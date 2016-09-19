const A_INDEX = 'A'.charCodeAt(0);

function getIndex(letter) {
  return letter.charCodeAt(0) - A_INDEX;
}

function getLetter(index) {
  return String.fromCharCode(outputIndex + A_INDEX);
}

function getShiftedLetter(currentLetter, shift) {
  let currentIndex = getIndex(currentLetter)
  let outputIndex = (currentIndex + 26 + shift) % 26;
  return getLetter(outputIndex);
}

function getNextLetter (currentLetter) {
  return getShiftedLetter(currentLetter, 1);
}

function getNotchLetter(windowLetter) {
  return getShiftedLetter(windowLetter, 8);
}

export {A_INDEX, getIndex, getLetter, getNextLetter, getNotchLetter};
