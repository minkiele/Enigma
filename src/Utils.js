const A_INDEX = 'A'.charCodeAt(0);

function getShiftedLetter(currentLetter, shift) {
  let currentIndex = currentLetter.charCodeAt(0) - A_INDEX;
  let outputIndex = (currentIndex + 26 + shift) % 26;
  return String.fromCharCode(outputIndex + A_INDEX);
}

function getNextLetter (currentLetter) {
  return getShiftedLetter(currentLetter, 1);
}

function getNotchLetter(windowLetter) {
  return getShiftedLetter(windowLetter, 1);
}

export {A_INDEX, getNextLetter, getNotchLetter};
