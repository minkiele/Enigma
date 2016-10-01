'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndex = getIndex;
exports.getLetter = getLetter;
exports.getShiftedLetter = getShiftedLetter;
exports.getNextLetter = getNextLetter;
exports.getNotchLetter = getNotchLetter;
exports.getModularNumber = getModularNumber;
exports.isUpperCaseLetter = isUpperCaseLetter;
exports.normalizeInput = normalizeInput;
var A_INDEX = exports.A_INDEX = 'A'.charCodeAt(0);

function getIndex(letter) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  return letter.charCodeAt(index) - A_INDEX;
}

function getLetter(index) {
  return String.fromCharCode(index + A_INDEX);
}

function getShiftedLetter(currentLetter, shift) {
  var currentIndex = getIndex(currentLetter);
  var outputIndex = getModularNumber(currentIndex + shift);
  return getLetter(outputIndex);
}

function getNextLetter(currentLetter) {
  return getShiftedLetter(currentLetter, 1);
}

function getNotchLetter(windowLetter) {
  return getShiftedLetter(windowLetter, 8);
}

function getModularNumber(expression) {
  var module = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 26;

  return (module + expression) % module;
}

var upperCaseLetterRegexp = /^[A-Z]$/;

function isUpperCaseLetter(input) {
  return upperCaseLetterRegexp.test(input);
}

function normalizeInput(letter) {
  var upperCase = ('' + letter).toUpperCase();
  if (isUpperCaseLetter(upperCase)) {
    return upperCase.charAt(0);
  } else {
    throw 'Input cannot be normalized';
  }
}