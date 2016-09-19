import PlugBoard from "./Component/PlugBoard";
import {A_INDEX, getNextLetter, getNotchLetter} from "./Utils";
import EntryWheel from "./Component/WiredWheel/EntryWheel";

const LEFT_ROTOR = 'L';
const CENTER_ROTOR = 'C';
const RIGHT_ROTOR = 'R';

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
    return notchLetter === this.getRotor(position).notchPosition;
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

    var normalizedInputLetter = inputLetter.toUpperCase();
    var swappedInputLetter = this.plugboard.getSwappedLetter(normalizedInputLetter);
    var inputPosition = this.entryWheel.getPinFromLetter(swappedInputLetter);
  }

}
