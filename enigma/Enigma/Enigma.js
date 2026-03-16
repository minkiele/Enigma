import PlugBoard from '../Component/PlugBoard/PlugBoard.js';
import { getNotchLetter, getNextLetter, getModularNumber, getIndex, } from '../lib/utils.js';
import EntryWheel from '../Component/WiredWheel/EntryWheel.js';
import Rotor from '../Component/WiredWheel/Rotor/RotorII.js';
import Reflector from '../Component/WiredWheel/Reflector/Reflector.js';
const LEFT_ROTOR = 'L';
const CENTER_ROTOR = 'C';
const RIGHT_ROTOR = 'R';
/**
 * Enigma M3 Implementation.
 * To make it operational you must at least set the 3 rotors
 * and the reflector. Plugs are optional.
 */
export default class Enigma {
    plugBoard = new PlugBoard();
    entryWheel = new EntryWheel();
    rotors = {};
    rotorsWindowLetter = {};
    reflector = null;
    constructor() {
        this.setRotor(null, LEFT_ROTOR);
        this.setRotor(null, CENTER_ROTOR);
        this.setRotor(null, RIGHT_ROTOR);
    }
    getPlugBoard() {
        return this.plugBoard;
    }
    setRotor(rotor, position) {
        this.rotors[position] = rotor;
        this.setRotorWindowLetter('A', position);
        return this;
    }
    getRotor(position) {
        return this.rotors[position];
    }
    unsetRotor(position) {
        this.rotors[position] = null;
        this.setRotorWindowLetter('A', position);
        return this;
    }
    getReflector() {
        return this.reflector;
    }
    setReflector(reflector) {
        this.reflector = reflector;
        return this;
    }
    unsetReflector() {
        this.reflector = null;
        return this;
    }
    setRotorWindowLetter(letter, position) {
        this.rotorsWindowLetter[position] = letter;
        return this;
    }
    getRotorWindowLetter(position) {
        return this.rotorsWindowLetter[position];
    }
    isRotorInNotchPosition(position) {
        const notchLetter = getNotchLetter(this.getRotorWindowLetter(position));
        return (this.getRotor(position)?.notchPosition.includes(notchLetter) ?? false);
    }
    advanceRotor(position) {
        this.setRotorWindowLetter(getNextLetter(this.getRotorWindowLetter(position)), position);
        return this;
    }
    advanceRotors() {
        const isCenterNotch = this.isRotorInNotchPosition(CENTER_ROTOR);
        const isRightNotch = this.isRotorInNotchPosition(RIGHT_ROTOR);
        if (isCenterNotch) {
            this.advanceRotor(LEFT_ROTOR);
        }
        //And that's how we deal with the double step
        if (isCenterNotch || isRightNotch) {
            this.advanceRotor(CENTER_ROTOR);
        }
        this.advanceRotor(RIGHT_ROTOR);
        return this;
    }
    encodeForward(inputLetter) {
        //FORWARD THROUGH THE NON ROTATING PARTS
        const normalizedInputLetter = inputLetter.toUpperCase();
        const swappedInputLetter = this.plugBoard.getSwappedLetter(normalizedInputLetter, PlugBoard.DIRECTION_FORWARD);
        const entryWheelInputPosition = this.entryWheel.getPlateFromLetter(swappedInputLetter);
        //RIGHT ROTOR
        const rightRotorInputPin = this.getRotorInputPosition(entryWheelInputPosition, RIGHT_ROTOR);
        const rightRotorOutputPlate = this.getRotor(RIGHT_ROTOR)?.pinToPlate(rightRotorInputPin);
        if (rightRotorOutputPlate == null) {
            throw new Error('Cannot encode forward, missing right rotor');
        }
        const rightRotorForwardOutputPosition = this.getRotorOutputPosition(rightRotorOutputPlate, RIGHT_ROTOR);
        //CENTER ROTOR
        const centerRotorInputPin = this.getRotorInputPosition(rightRotorForwardOutputPosition, CENTER_ROTOR);
        const centerRotorOutputPlate = this.getRotor(CENTER_ROTOR)?.pinToPlate(centerRotorInputPin);
        if (centerRotorOutputPlate == null) {
            throw new Error('Cannot encode forward, missing center rotor');
        }
        const centerRotorForwardOutputPosition = this.getRotorOutputPosition(centerRotorOutputPlate, CENTER_ROTOR);
        //LEFT ROTOR
        const leftRotorInputPin = this.getRotorInputPosition(centerRotorForwardOutputPosition, LEFT_ROTOR);
        const leftRotorOutputPlate = this.getRotor(LEFT_ROTOR)?.pinToPlate(leftRotorInputPin);
        if (leftRotorOutputPlate == null) {
            throw new Error('Cannot encode forward, missing left rotor');
        }
        const leftRotorForwardOutputPosition = this.getRotorOutputPosition(leftRotorOutputPlate, LEFT_ROTOR);
        return leftRotorForwardOutputPosition;
    }
    encodeReflect(leftRotorForwardOutputPosition) {
        //REFLECTION
        const reflectedPosition = this.getReflector()?.pinToPin(leftRotorForwardOutputPosition);
        if (reflectedPosition == null) {
            throw new Error('Cannot reflect, missing reflector');
        }
        //AND NOW BACKWARDS!
        return reflectedPosition;
    }
    encodeBackwards(reflectedPosition) {
        //LEFT ROTOR
        const leftRotorInputPlate = this.getRotorInputPosition(reflectedPosition, LEFT_ROTOR);
        const leftRotorOutputPin = this.getRotor(LEFT_ROTOR)?.plateToPin(leftRotorInputPlate);
        if (leftRotorOutputPin == null) {
            throw new Error('Cannot encode backwards, missing left rotor');
        }
        const leftRotorBackwardsOutputPosition = this.getRotorOutputPosition(leftRotorOutputPin, LEFT_ROTOR);
        //CENTER ROTOR
        const centerRotorInputPosition = this.getRotorInputPosition(leftRotorBackwardsOutputPosition, CENTER_ROTOR);
        const centerRotorOutputPin = this.getRotor(CENTER_ROTOR)?.plateToPin(centerRotorInputPosition);
        if (centerRotorOutputPin == null) {
            throw new Error('Cannot encode backwards, missing center rotor');
        }
        const centerRotorBackwardsOutputPosition = this.getRotorOutputPosition(centerRotorOutputPin, CENTER_ROTOR);
        //RIGHT ROTOR
        const rightRotorInputPlate = this.getRotorInputPosition(centerRotorBackwardsOutputPosition, RIGHT_ROTOR);
        const rightRotorOutputPin = this.getRotor(RIGHT_ROTOR)?.plateToPin(rightRotorInputPlate);
        if (rightRotorOutputPin == null) {
            throw new Error('Cannot encode backwards, missing right rotor');
        }
        const rightRotorBackwardsOutputPosition = this.getRotorOutputPosition(rightRotorOutputPin, RIGHT_ROTOR);
        //AND THROUGH AGAIN THE NON ROTATING PARTS
        const entryWheelOutputLetter = this.entryWheel.getLetterFromPlate(rightRotorBackwardsOutputPosition);
        const swappedOutputLetter = this.plugBoard.getSwappedLetter(entryWheelOutputLetter, PlugBoard.DIRECTION_BACKWARDS);
        return swappedOutputLetter;
    }
    getEncodedLetter(inputLetter) {
        if (!this.isMachineValidState()) {
            throw 'Machine is not in valid state';
        }
        this.advanceRotors();
        const leftRotorForwardOutputPosition = this.encodeForward(inputLetter);
        const reflectedPosition = this.encodeReflect(leftRotorForwardOutputPosition);
        const swappedOutputLetter = this.encodeBackwards(reflectedPosition);
        return swappedOutputLetter;
    }
    getRotorInputPosition(inputPosition, rotor) {
        const ringPosition = this.getRotor(rotor)?.ringPosition;
        if (ringPosition == null) {
            throw new Error('Missing rotor');
        }
        return getModularNumber(inputPosition + getIndex(this.getRotorWindowLetter(rotor)) - ringPosition);
    }
    getRotorOutputPosition(outputPosition, rotor) {
        const ringPosition = this.getRotor(rotor)?.ringPosition;
        if (ringPosition == null) {
            throw new Error('Missing rotor');
        }
        return getModularNumber(outputPosition -
            getIndex(this.getRotorWindowLetter(rotor)) +
            ringPosition);
    }
    encode(string) {
        let output = '';
        for (let i = 0; i < string.length; i += 1) {
            output += this.getEncodedLetter(string.charAt(i));
        }
        return output;
    }
    isMachineValidState() {
        return (this.getRotor(LEFT_ROTOR) instanceof Rotor &&
            this.getRotor(CENTER_ROTOR) instanceof Rotor &&
            this.getRotor(RIGHT_ROTOR) instanceof Rotor &&
            this.reflector instanceof Reflector);
    }
    static LEFT_ROTOR = LEFT_ROTOR;
    static CENTER_ROTOR = CENTER_ROTOR;
    static RIGHT_ROTOR = RIGHT_ROTOR;
}
