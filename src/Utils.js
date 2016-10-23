export const A_INDEX = 'A'.charCodeAt(0);

export function getIndex (letter, index = 0) {
  return letter.charCodeAt(index) - A_INDEX;
}

export function getLetter (index) {
  return String.fromCharCode(index + A_INDEX);
}

export function getShiftedLetter (currentLetter, shift) {
  let currentIndex = getIndex(currentLetter)
  let outputIndex = getModularNumber(currentIndex + shift);
  return getLetter(outputIndex);
}

export function getNextLetter (currentLetter) {
  return getShiftedLetter(currentLetter, 1);
}

export function getNotchLetter (windowLetter) {
  return getShiftedLetter(windowLetter, 8);
}

export function getModularNumber (expression, module = 26) {
  return (module + expression) % module;
}

let upperCaseLetterRegexp = /^[A-Z]$/;

export function isUpperCaseLetter (input){
  return upperCaseLetterRegexp.test(input);
}

export function normalizeInput (letter) {
  let upperCase = `${letter}`.toUpperCase();
  if(isUpperCaseLetter(upperCase)){
    return upperCase.charAt(0);
  } else {
    throw 'Input cannot be normalized';
  }
}
