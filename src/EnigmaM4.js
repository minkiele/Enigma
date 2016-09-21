import * as Enigma from "./Enigma";

export const FOURTH_ROTOR = 'F';

export default class EnigmaM4 extends Enigma.default {
  constructor () {
    super();
    this.setRotor(null, FOURTH_ROTOR);
  }

  getEncodedLetter (inputLetter) {

    this.advanceRotors();

    //FORWARD THROUGH THE NON ROTATING PARTS
    let normalizedInputLetter = inputLetter.toUpperCase();
    let swappedInputLetter = this.plugBoard.getSwappedLetter(normalizedInputLetter);
    let entryWheelInputPosition = this.entryWheel.getPlateFromLetter(swappedInputLetter);

    //RIGHT ROTOR
    let rightRotorInputPin = this.getRotorInputPosition(entryWheelInputPosition, Enigma.RIGHT_ROTOR);
    let rightRotorOutputPlate = this.getRotor(Enigma.RIGHT_ROTOR).pinToPlate(rightRotorInputPin);
    let rightRotorForwardOutputPosition = this.getRotorOutputPosition(rightRotorOutputPlate, Enigma.RIGHT_ROTOR);

    //CENTER ROTOR
    let centerRotorInputPin = this.getRotorInputPosition(rightRotorForwardOutputPosition, Enigma.CENTER_ROTOR);
    let centerRotorOutputPlate = this.getRotor(Enigma.CENTER_ROTOR).pinToPlate(centerRotorInputPin);
    let centerRotorForwardOutputPosition = this.getRotorOutputPosition(centerRotorOutputPlate, Enigma.CENTER_ROTOR);

    //LEFT ROTOR
    let leftRotorInputPin = this.getRotorInputPosition(centerRotorForwardOutputPosition, Enigma.LEFT_ROTOR);
    let leftRotorOutputPlate = this.getRotor(Enigma.LEFT_ROTOR).pinToPlate(leftRotorInputPin);
    let leftRotorForwardOutputPosition = this.getRotorOutputPosition(leftRotorOutputPlate, Enigma.LEFT_ROTOR);

    //FOURTH ROTOR
    let fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
    let fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR).pinToPlate(fourthRotorForwardInputPin);
    let fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);

    //REFLECTION
    let reflectedPosition = this.reflector.pinToPin(fourthRotorForwardOutputPosition);
    //AND NOW BACKWARDS!

    //FOURTH ROTOR
    let fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
    let fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR).plateToPin(fourthRotorBackwardsInputPin);
    let fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);

    //LEFT ROTOR
    let leftRotorInputPlate = this.getRotorInputPosition(fourthRotorBackwardsOutputPosition, Enigma.LEFT_ROTOR);
    let leftRotorOutputPin = this.getRotor(Enigma.LEFT_ROTOR).plateToPin(leftRotorInputPlate);
    let leftRotorBackwardsOutputPosition = this.getRotorOutputPosition(leftRotorOutputPin, Enigma.LEFT_ROTOR);

    //CENTER ROTOR
    let centerRotorInputPosition = this.getRotorInputPosition(leftRotorBackwardsOutputPosition, Enigma.CENTER_ROTOR);
    let centerRotorOutputPin = this.getRotor(Enigma.CENTER_ROTOR).plateToPin(centerRotorInputPosition);
    let centerRotorBackwardsOutputPosition = this.getRotorOutputPosition(centerRotorOutputPin, Enigma.CENTER_ROTOR);

    //RIGHT ROTOR
    let rightRotorInputPlate = this.getRotorInputPosition(centerRotorBackwardsOutputPosition, Enigma.RIGHT_ROTOR);
    let rightRotorOutputPin = this.getRotor(Enigma.RIGHT_ROTOR).plateToPin(rightRotorInputPlate);
    let rightRotorBackwardsOutputPosition = this.getRotorOutputPosition(rightRotorOutputPin, Enigma.RIGHT_ROTOR);

    //AND THROUGH AGAIN THE NON ROTATING PARTS
    let entryWheelOutputLetter = this.entryWheel.getLetterFromPlate(rightRotorBackwardsOutputPosition);
    let swappedOutputLetter = this.plugBoard.getSwappedLetter(entryWheelOutputLetter);

    return swappedOutputLetter;

  }

}
