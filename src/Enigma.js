import PlugBoard from "./Component/PlugBoard";
import * as Utils from "./Utils";
import EntryWheel from "./Component/WiredWheel/EntryWheel";

export const LEFT_ROTOR = 'L';
export const CENTER_ROTOR = 'C';
export const RIGHT_ROTOR = 'R';

export default class Enigma {

  constructor () {
    this.plugboard = new PlugBoard();
    this.entryWheel = new EntryWheel();
    this.rotors = {};
    this.rotorsWindowLetter = {};
    this.setRotor(null, LEFT_ROTOR);
    this.setRotor(null, CENTER_ROTOR);
    this.setRotor(null, RIGHT_ROTOR);
  }

  setRotor (rotor, position) {
    this.rotors[position] = rotor;
    this.setRotorWindowLetter('A', position);
  }

  getRotor (position) {
    return this.rotors[position];
  }

  setReflector(reflector) {
    this.reflector = reflector;
  }

  setRotorWindowLetter(letter, position) {
    this.rotorsWindowLetter[position] = letter;
  }

  getRotorWindowLetter(position) {
    return this.rotorsWindowLetter[position];
  }

  isRotorInNotchPosition (position) {
    let notchLetter = Utils.getNotchLetter(this.getRotorWindowLetter(position));
    return this.getRotor(position).notchPosition.indexOf(notchLetter) > -1;
  }

  advanceRotor (rotor) {
    this.setRotorWindowLetter(Utils.getNextLetter(this.getRotorWindowLetter(rotor)), rotor);
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

    //FORWARD THROUGH THE NON ROTATING PARTS
    let normalizedInputLetter = inputLetter.toUpperCase();
    let swappedInputLetter = this.plugboard.getSwappedLetter(normalizedInputLetter);
    let entryWheelInputPosition = this.entryWheel.getPlateFromLetter(swappedInputLetter);

    //RIGHT ROTOR
    let rightRotorInputPin = this.getRotorInputPosition(entryWheelInputPosition, RIGHT_ROTOR);
    let rightRotorOutputPlate = this.getRotor(RIGHT_ROTOR).pinToPlate(rightRotorInputPin);
    let rightRotorForwardOutputPosition = this.getRotorOutputPosition(rightRotorOutputPlate, RIGHT_ROTOR);

    //CENTER ROTOR
    let centerRotorInputPin = this.getRotorInputPosition(rightRotorForwardOutputPosition, CENTER_ROTOR);
    let centerRotorOutputPlate = this.getRotor(CENTER_ROTOR).pinToPlate(centerRotorInputPin);
    let centerRotorForwardOutputPosition = this.getRotorOutputPosition(centerRotorOutputPlate, CENTER_ROTOR);

    //LEFT ROTOR
    let leftRotorInputPin = this.getRotorInputPosition(centerRotorForwardOutputPosition, LEFT_ROTOR);
    let leftRotorOutputPlate = this.getRotor(LEFT_ROTOR).pinToPlate(leftRotorInputPin);
    let leftRotorForwardOutputPosition = this.getRotorOutputPosition(leftRotorOutputPlate, LEFT_ROTOR);

    //REFLECTION
    let reflectedPosition = this.reflector.pinToPin(leftRotorForwardOutputPosition);
    //AND NOW BACKWARDS!

    //LEFT ROTOR
    let leftRotorInputPlate = this.getRotorInputPosition(reflectedPosition, LEFT_ROTOR);
    let leftRotorOutputPin = this.getRotor(LEFT_ROTOR).plateToPin(leftRotorInputPlate);
    let leftRotorBackwardsOutputPosition = this.getRotorOutputPosition(leftRotorOutputPin, LEFT_ROTOR);

    //CENTER ROTOR
    let centerRotorInputPosition = this.getRotorInputPosition(leftRotorBackwardsOutputPosition, CENTER_ROTOR);
    let centerRotorOutputPin = this.getRotor(CENTER_ROTOR).plateToPin(centerRotorInputPosition);
    let centerRotorBackwardsOutputPosition = this.getRotorOutputPosition(centerRotorOutputPin, CENTER_ROTOR);

    //RIGHT ROTOR
    let rightRotorInputPlate = this.getRotorInputPosition(centerRotorBackwardsOutputPosition, RIGHT_ROTOR);
    let rightRotorOutputPin = this.getRotor(RIGHT_ROTOR).plateToPin(rightRotorInputPlate);
    let rightRotorBackwardsOutputPosition = this.getRotorOutputPosition(rightRotorOutputPin, RIGHT_ROTOR);

    //AND THROUGH AGAIN THE NON ROTATING PARTS
    let entryWheelOutputLetter = this.entryWheel.getLetterFromPlate(rightRotorBackwardsOutputPosition);
    let swappedOutputLetter = this.plugboard.getSwappedLetter(entryWheelOutputLetter);

    return swappedOutputLetter;

  }

  getRotorInputPosition(inputPosition, rotor) {
    return (
      26 +
      inputPosition +
      Utils.getIndex(this.getRotorWindowLetter(rotor)) -
      this.getRotor(rotor).ringPosition
    ) % 26;
  }

  getRotorOutputPosition(outputPosition, rotor) {
    return (
      26 +
      outputPosition -
      Utils.getIndex(this.getRotorWindowLetter(rotor)) +
      this.getRotor(rotor).ringPosition
    ) % 26;
  }

}
