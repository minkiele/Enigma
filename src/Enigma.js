import Plugboard from "./Component/PlugBoard";
import {A_INDEX, getNextLetter} from "./Utils";
import EntryWheel from "./Component/WiredWheel/EntryWheel";

export default class Enigma {

  constructor () {
    this.plugboard = new PlugBoard();
    this.entryWheel = new EntryWheel();
  }

  setLeftRotor (leftRotor) {
    this.leftRotor = leftRotor;
  }

  setLeftRotorLetter (leftRotorLetter) {
    this.leftRotorLetter = leftRotorLetter.toUpperCase();
  }

  advanceLeftRotor () {
    this.leftRotorLetter = getNextLetter(this.leftRotorLetter);
  }

  setCenterRotor (centerRotor) {
    this.centerRotor = centerRotor;
  }

  setCenterRotorLetter (centerRotorLetter) {
    this.centerRotorLetter = centerRotorLetter.toUpperCase();
  }

  advanceCenterRotor () {
    this.centerRotorLetter = getNextLetter(this.centerRotorLetter);
  }

  setRightRotor (rightRotor) {
    this.rightRotor = rightRotor;
  }

  setRightRotorLetter (rightRotorLetter) {
    this.rightRotorLetter = rightRotorLetter.toUpperCase();
  }

  advanceRightRotor () {
    this.rightRotorLetter = getNextLetter(this.rightRotorLetter);
  }

  getEncodedLetter (inputLetter) {
    var normalizedInputLetter = inputLetter.toUpperCase();
    var swappedInputLetter = this.plugboard.getSwappedLetter(normalizedInputLetter);
    var inputPosition = this.entryWheel.getPinFromLetter(swappedInputLetter);
  }

}
