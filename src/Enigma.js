import PlugBoard from "./Component/PlugBoard";
import {A_INDEX, getIndex, getLetter, getNextLetter, getNotchLetter} from "./Utils";
import EntryWheel from "./Component/WiredWheel/EntryWheel";

export const LEFT_ROTOR = 'L';
export const CENTER_ROTOR = 'C';
export const RIGHT_ROTOR = 'R';

export default class Enigma {

  constructor () {
    this.plugboard = new PlugBoard();
    this.entryWheel = new EntryWheel();
    this.rotors = {};
    this.rotors[LEFT_ROTOR] = null;
    this.rotors[CENTER_ROTOR] = null;
    this.rotors[RIGHT_ROTOR] = null;
    this.rotorsWindowLetter = {};

    this.rotorsWindowLetter[LEFT_ROTOR] = null;
    this.rotorsWindowLetter[CENTER_ROTOR] = null;
    this.rotorsWindowLetter[RIGHT_ROTOR] = null;

  }

  setRotor (rotor, position) {
    this.rotors[position] = rotor;
    this.setRotorWindowLetter('A', position);
  }

  getRotor (position) {
    return this.rotors[position];
  }

  setRotorWindowLetter(letter, position) {
    this.rotorsWindowLetter[position] = letter;
  }

  getRotorWindowLetter(position) {
    return this.rotorsWindowLetter[position];
  }

  isRotorInNotchPosition (position) {
    let notchLetter = getNotchLetter(this.getRotorWindowLetter(position));
    return this.getRotor(position).notchPosition.indexOf(notchLetter) > -1;
  }

  advanceRotor (rotor) {
    this.setRotorWindowLetter(getNextLetter(this.getRotorWindowLetter(rotor)), rotor);
  }

  advanceRotors () {
    let isCenterNotch = this.isRotorInNotchPosition(CENTER_ROTOR);
    let isRightNotch = this.isRotorInNotchPosition(RIGHT_ROTOR);
    if(isCenterNotch) {
      this.advanceRotor(LEFT_ROTOR);
    }
    //And that's how we deal with the double step
    if(isCenterNotch || isRightNotch) {
      this.advanceRotor(CENTER_ROTOR);
    }
    this.advanceRotor(RIGHT_ROTOR);
  }

  getEncodedLetter (inputLetter) {

    this.advanceRotors();

    let normalizedInputLetter = inputLetter.toUpperCase();
    let swappedInputLetter = this.plugboard.getSwappedLetter(normalizedInputLetter);
    let inputPosition = this.entryWheel.getPinFromLetter(swappedInputLetter);
    //let rightRotorWindowIndex = getIndex(this.getRotorWindowLetter(RIGHT_ROTOR));
    //let rightRotorInputPin = (26 + rightRotorWindowIndex - this.getRotor(RIGHT_ROTOR).ringPosition) % 26;
    //let rightRotorOutputPlate = this.getRotor(RIGHT_ROTOR).getOutputPlate(rightRotorInputPin);
    //rightRotorOutputPlate = (26 - rightRotorOutputPlate) % 26;

    //I must find some easy way to compute all the relative shiftings

  }

}
