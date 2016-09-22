import Enigma from "./Enigma";
import ThinRotor from "./Component/WiredWheel/Rotor/ThinRotor";

export const FOURTH_ROTOR = 'F';

export default class EnigmaM4 extends Enigma {

  constructor () {
    super();
    this.setRotor(null, FOURTH_ROTOR);
  }

  encodeForward (inputLetter) {

    var leftRotorForwardOutputPosition = super.encodeForward(inputLetter);

    //FOURTH ROTOR
    let fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
    let fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR).pinToPlate(fourthRotorForwardInputPin);
    let fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);

    return fourthRotorForwardOutputPosition;

  }

  encodeBackwards (reflectedPosition) {

    //FOURTH ROTOR
    let fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
    let fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR).plateToPin(fourthRotorBackwardsInputPin);
    let fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);

    return super.encodeBackwards(fourthRotorBackwardsOutputPosition);

  }

}
