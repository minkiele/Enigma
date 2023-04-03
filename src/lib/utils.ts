const A_INDEX: number = 'A'.charCodeAt(0);

export function getIndex(letter: string, index = 0): number {
  return letter.charCodeAt(index) - A_INDEX;
}

export function getLetter(index: number): string {
  return String.fromCharCode(index + A_INDEX);
}

export function getShiftedLetter(currentLetter: string, shift: number): string {
  const currentIndex = getIndex(currentLetter);
  const outputIndex = getModularNumber(currentIndex + shift);
  return getLetter(outputIndex);
}

export function getNextLetter(currentLetter: string): string {
  return getShiftedLetter(currentLetter, 1);
}

export function getNotchLetter(windowLetter: string): string {
  return getShiftedLetter(windowLetter, 8);
}

export function getModularNumber(expression: number, module = 26): number {
  return (module + expression) % module;
}

const upperCaseLetterRegexp = /^[A-Z]$/;

export function isUpperCaseLetter(input: string): boolean {
  return upperCaseLetterRegexp.test(input);
}

export function normalizeInput(letter: string): string {
  const upperCase: string = `${letter}`.toUpperCase();
  if (isUpperCaseLetter(upperCase)) {
    return upperCase.charAt(0);
  } else {
    throw 'Input cannot be normalized';
  }
}
