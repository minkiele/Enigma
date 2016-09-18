import Plugboard from "./PlugBoard";
import {A_INDEX, getNextLetter} from "./Utils";

export default class Enigma {

  constructor () {
    this.plugboard = new PlugBoard();
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

  encodeLetter (letter) {

  }

}
