"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeInput = exports.isUpperCaseLetter = exports.getModularNumber = exports.getNotchLetter = exports.getNextLetter = exports.getShiftedLetter = exports.getLetter = exports.getIndex = exports.A_INDEX = void 0;
exports.A_INDEX = 'A'.charCodeAt(0);
function getIndex(letter, index) {
    if (index === void 0) { index = 0; }
    return letter.charCodeAt(index) - exports.A_INDEX;
}
exports.getIndex = getIndex;
function getLetter(index) {
    return String.fromCharCode(index + exports.A_INDEX);
}
exports.getLetter = getLetter;
function getShiftedLetter(currentLetter, shift) {
    var currentIndex = getIndex(currentLetter);
    var outputIndex = getModularNumber(currentIndex + shift);
    return getLetter(outputIndex);
}
exports.getShiftedLetter = getShiftedLetter;
function getNextLetter(currentLetter) {
    return getShiftedLetter(currentLetter, 1);
}
exports.getNextLetter = getNextLetter;
function getNotchLetter(windowLetter) {
    return getShiftedLetter(windowLetter, 8);
}
exports.getNotchLetter = getNotchLetter;
function getModularNumber(expression, module) {
    if (module === void 0) { module = 26; }
    return (module + expression) % module;
}
exports.getModularNumber = getModularNumber;
var upperCaseLetterRegexp = /^[A-Z]$/;
function isUpperCaseLetter(input) {
    return upperCaseLetterRegexp.test(input);
}
exports.isUpperCaseLetter = isUpperCaseLetter;
function normalizeInput(letter) {
    var upperCase = ("" + letter).toUpperCase();
    if (isUpperCaseLetter(upperCase)) {
        return upperCase.charAt(0);
    }
    else {
        throw 'Input cannot be normalized';
    }
}
exports.normalizeInput = normalizeInput;
