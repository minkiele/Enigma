import Enigma from './Enigma.js';
import ThinRotor from '../Component/WiredWheel/Rotor/ThinRotor/ThinRotor.js';
import Reflector from '../Component/WiredWheel/Reflector/Reflector.js';
import ThinReflector from '../Component/WiredWheel/Reflector/ThinReflector/ThinReflector.js';
const FOURTH_ROTOR = 'F';
/**
 * Implementation of an Enigma M4. It can operate either
 * with the classic configuration (3 rotors + 1 reflector) or
 * with the M4 configuration (3 rotors + 1 thin rotor + 1 thin reflector)
 */
export default class EnigmaM4 extends Enigma {
    constructor() {
        super();
        this.setRotor(null, FOURTH_ROTOR);
    }
    encodeForward(inputLetter) {
        const leftRotorForwardOutputPosition = super.encodeForward(inputLetter);
        if (this.isClassicConfiguration()) {
            return leftRotorForwardOutputPosition;
        }
        else {
            //FOURTH ROTOR
            const fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
            const fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR)?.pinToPlate(fourthRotorForwardInputPin);
            if (fourthRotorForwardOutputPin == null) {
                throw new Error('Cannot encode forward, missing left rotor');
            }
            const fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);
            return fourthRotorForwardOutputPosition;
        }
    }
    encodeBackwards(reflectedPosition) {
        let inputReflectedPosition;
        if (this.isClassicConfiguration()) {
            inputReflectedPosition = reflectedPosition;
        }
        else {
            //FOURTH ROTOR
            const fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
            const fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR)?.plateToPin(fourthRotorBackwardsInputPin);
            if (fourthRotorBackwardsOutputPin == null) {
                throw new Error('Cannot encode backwards, missing left rotor');
            }
            const fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);
            inputReflectedPosition = fourthRotorBackwardsOutputPosition;
        }
        return super.encodeBackwards(inputReflectedPosition);
    }
    isClassicConfiguration() {
        return (this.getRotor(FOURTH_ROTOR) == null &&
            this.reflector instanceof Reflector &&
            !(this.reflector instanceof ThinReflector));
    }
    isMachineValidState() {
        const superTest = super.isMachineValidState();
        if (this.isClassicConfiguration()) {
            return superTest;
        }
        else {
            return (superTest &&
                this.getRotor(FOURTH_ROTOR) instanceof ThinRotor &&
                this.reflector instanceof ThinReflector);
        }
    }
    static FOURTH_ROTOR = FOURTH_ROTOR;
}
