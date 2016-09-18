export default class Enigma {

  constructor () {

  }

  setLeftRotor (leftRotor) {
    this.leftRotor = leftRotor;
  }

  setLeftRotorLetter (leftRotorLetter) {
    this.leftRotorLetter = leftRotorLetter.toUpperCase();
  }

  setCenterRotor (centerRotor) {
    this.centerRotor = centerRotor;
  }

  setCenterRotorLetter (centerRotorLetter) {
    this.centerRotorLetter = centerRotorLetter.toUpperCase();
  }

  setRightRotor (rightRotor) {
    this.rightRotor = rightRotor;
  }

  setRightRotorLetter (rightRotorLetter) {
    this.rightRotorLetter = rightRotorLetter.toUpperCase();
  }

}
