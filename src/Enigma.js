import PlugBoard from "./Component/PlugBoard";
import * as Utils from "./Utils";
import EntryWheel from "./Component/WiredWheel/EntryWheel";
import Rotor from "./Component/WiredWheel/Rotor";
import Reflector from "./Component/WiredWheel/Reflector";
import EventEmitter from "events";

const LEFT_ROTOR = 'L';
const CENTER_ROTOR = 'C';
const RIGHT_ROTOR = 'R';

export default class Enigma extends EventEmitter {

  constructor () {
    super();
    this.plugBoard = new PlugBoard();
    this.entryWheel = new EntryWheel();
    this.rotors = {};
    this.rotorsWindowLetter = {};
    this.setRotor(null, LEFT_ROTOR);
    this.setRotor(null, CENTER_ROTOR);
    this.setRotor(null, RIGHT_ROTOR);
  }

  getPlugBoard () {
    return this.plugBoard;
  }

  setRotor (rotor, position) {
    this.rotors[position] = rotor;
    this.emit('change.rotorSet', rotor, position);
    this.setRotorWindowLetter('A', position);
    return this;
  }

  getRotor (position) {
    return this.rotors[position];
  }

  setReflector (reflector) {
    this.reflector = reflector;
    this.emit('change.reflectorSet', reflector);
    return this;
  }

  setRotorWindowLetter (letter, position) {
    this.rotorsWindowLetter[position] = letter;
    this.emit('change.rotorWindowLetterSet', letter, position, this.getRotor(position))
    return this;
  }

  getRotorWindowLetter (position) {
    return this.rotorsWindowLetter[position];
  }

  isRotorInNotchPosition (position) {
    let notchLetter = Utils.getNotchLetter(this.getRotorWindowLetter(position));
    return this.getRotor(position).notchPosition.indexOf(notchLetter) > -1;
  }

  advanceRotor (position) {
    this.setRotorWindowLetter(Utils.getNextLetter(this.getRotorWindowLetter(position)), position);
    this.emit('change.rotorAdvanced', position, this.getRotor(position), this.getRotorWindowLetter(position));
    return this;
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
    this.emit('change.rotorsAdvanced');
    return this;
  }

  encodeForward (inputLetter) {

    //FORWARD THROUGH THE NON ROTATING PARTS
    let normalizedInputLetter = inputLetter.toUpperCase();
    let swappedInputLetter = this.plugBoard.getSwappedLetter(normalizedInputLetter);
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

    return leftRotorForwardOutputPosition;

  }

  encodeReflect (leftRotorForwardOutputPosition) {
    //REFLECTION
    let reflectedPosition = this.reflector.pinToPin(leftRotorForwardOutputPosition);
    //AND NOW BACKWARDS!

    return reflectedPosition;

  }

  encodeBackwards (reflectedPosition) {

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
    let swappedOutputLetter = this.plugBoard.getSwappedLetter(entryWheelOutputLetter);

    return swappedOutputLetter;

  }

  getEncodedLetter (inputLetter) {

    if(!this.isMachineValidState()) {
      throw "Machine is not in valid state";
    }

    this.advanceRotors();

    let leftRotorForwardOutputPosition = this.encodeForward(inputLetter);
    let reflectedPosition = this.encodeReflect(leftRotorForwardOutputPosition);
    let swappedOutputLetter = this.encodeBackwards(reflectedPosition);

    return swappedOutputLetter;

  }

  getRotorInputPosition (inputPosition, rotor) {
    return Utils.getModularNumber(
      inputPosition +
      Utils.getIndex(this.getRotorWindowLetter(rotor)) -
      this.getRotor(rotor).ringPosition
    );
  }

  getRotorOutputPosition (outputPosition, rotor) {
    return Utils.getModularNumber(
      outputPosition -
      Utils.getIndex(this.getRotorWindowLetter(rotor)) +
      this.getRotor(rotor).ringPosition
    );
  }

  encode (string) {
    let output = '';
    let normalizedString = string.toUpperCase();
    for(var i = 0; i < string.length; i += 1){
      output += this.getEncodedLetter(string.charAt(i));
    }
    return output;
  }

  isMachineValidState () {
    return this.getRotor(LEFT_ROTOR) instanceof Rotor &&
           this.getRotor(CENTER_ROTOR) instanceof Rotor &&
           this.getRotor(RIGHT_ROTOR) instanceof Rotor &&
           this.reflector instanceof Reflector;
  }

}

Enigma.LEFT_ROTOR = LEFT_ROTOR;
Enigma.CENTER_ROTOR = CENTER_ROTOR;
Enigma.RIGHT_ROTOR = RIGHT_ROTOR;
