export const A_INDEX = 'A'.charCodeAt(0);

export function getIndex(letter) {
  return letter.charCodeAt(0) - A_INDEX;
}

export function getLetter(index) {
  return String.fromCharCode(outputIndex + A_INDEX);
}

export function getShiftedLetter(currentLetter, shift) {
  let currentIndex = getIndex(currentLetter)
  let outputIndex = (currentIndex + 26 + shift) % 26;
  return getLetter(outputIndex);
}

export function getNextLetter (currentLetter) {
  return getShiftedLetter(currentLetter, 1);
}

export function getNotchLetter(windowLetter) {
  return getShiftedLetter(windowLetter, 8);
}
