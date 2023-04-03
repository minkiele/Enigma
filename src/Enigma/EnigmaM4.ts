import Enigma from './Enigma';
import ThinRotor from '../Component/WiredWheel/Rotor/ThinRotor/ThinRotor';
import Reflector from '../Component/WiredWheel/Reflector/Reflector';
import ThinReflector from '../Component/WiredWheel/Reflector/ThinReflector/ThinReflector';

const FOURTH_ROTOR = 'F';

export default class EnigmaM4 extends Enigma {
  constructor() {
    super();
    this.setRotor(null, FOURTH_ROTOR);
  }

  public encodeForward(inputLetter: string): number {
    const leftRotorForwardOutputPosition: number = super.encodeForward(
      inputLetter
    );

    if (this.isClassicConfiguration()) {
      return leftRotorForwardOutputPosition;
    } else {
      //FOURTH ROTOR
      const fourthRotorForwardInputPin = this.getRotorInputPosition(
        leftRotorForwardOutputPosition,
        FOURTH_ROTOR
      );
      const fourthRotorForwardOutputPin = this.getRotor(
        FOURTH_ROTOR
      ).pinToPlate(fourthRotorForwardInputPin);
      const fourthRotorForwardOutputPosition = this.getRotorOutputPosition(
        fourthRotorForwardOutputPin,
        FOURTH_ROTOR
      );
      return fourthRotorForwardOutputPosition;
    }
  }

  public encodeBackwards(reflectedPosition: number): string {
    let inputReflectedPosition: number;

    if (this.isClassicConfiguration()) {
      inputReflectedPosition = reflectedPosition;
    } else {
      //FOURTH ROTOR
      const fourthRotorBackwardsInputPin = this.getRotorInputPosition(
        reflectedPosition,
        FOURTH_ROTOR
      );
      const fourthRotorBackwardsOutputPin = this.getRotor(
        FOURTH_ROTOR
      ).plateToPin(fourthRotorBackwardsInputPin);
      const fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(
        fourthRotorBackwardsOutputPin,
        FOURTH_ROTOR
      );

      inputReflectedPosition = fourthRotorBackwardsOutputPosition;
    }

    return super.encodeBackwards(inputReflectedPosition);
  }

  public isClassicConfiguration(): boolean {
    return (
      this.getRotor(FOURTH_ROTOR) === null &&
      this.reflector instanceof Reflector &&
      !(this.reflector instanceof ThinReflector)
    );
  }

  public isMachineValidState(): boolean {
    const superTest: boolean = super.isMachineValidState();

    if (this.isClassicConfiguration()) {
      return superTest;
    } else {
      return (
        superTest &&
        this.getRotor(FOURTH_ROTOR) instanceof ThinRotor &&
        this.reflector instanceof ThinReflector
      );
    }
  }

  public static FOURTH_ROTOR: string = FOURTH_ROTOR;
}
