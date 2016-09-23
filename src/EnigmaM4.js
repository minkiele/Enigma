import Enigma, {LEFT_ROTOR, CENTER_ROTOR, RIGHT_ROTOR} from "./Enigma";
import ThinRotor from "./Component/WiredWheel/Rotor/ThinRotor";
import ThinReflector from "./Component/WiredWheel/Reflector/ThinReflector";

export {LEFT_ROTOR, CENTER_ROTOR, RIGHT_ROTOR};

export const FOURTH_ROTOR = 'F';

export default class EnigmaM4 extends Enigma {

  constructor () {
    super();
    this.setRotor(null, FOURTH_ROTOR);
  }

  encodeForward (inputLetter) {

    let leftRotorForwardOutputPosition = super.encodeForward(inputLetter);

    if(this.isClassicConfiguration()) {
      return leftRotorForwardOutputPosition;
    } else {
      //FOURTH ROTOR
      let fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
      let fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR).pinToPlate(fourthRotorForwardInputPin);
      let fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);
      return fourthRotorForwardOutputPosition;
    }

  }

  encodeBackwards (reflectedPosition) {

    let inputReflectedPosition;

    if(this.isClassicConfiguration()) {
      inputReflectedPosition = reflectedPosition;
    } else {
      //FOURTH ROTOR
      let fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
      let fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR).plateToPin(fourthRotorBackwardsInputPin);
      let fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);

      inputReflectedPosition = fourthRotorBackwardsOutputPosition;

    }

    return super.encodeBackwards(inputReflectedPosition);

  }

  isClassicConfiguration () {
    return this.getRotor(FOURTH_ROTOR) === null && this.reflector instanceof ThinRotor;
  }

  isMachineValidState () {

    let superTest = super.isMachineValidState();

    if(this.isClassicConfiguration()){
      return superTest;
    } else {
        return superTest &&
               this.getRotor(FOURTH_ROTOR) instanceof ThinRotor &&
               this.reflector instanceof ThinReflector;
    }
  }

}
