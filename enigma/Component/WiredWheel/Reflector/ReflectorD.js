import Reflector from './Reflector.js';
import { getIndex, getModularNumber } from '../../../lib/utils.js';
const COUPLES = 13;
const LOWER_LIMIT = 0;
const UPPER_LIMIT = 26;
const PERMANENTLY_WIRED_0 = 0;
const PERMANENTLY_WIRED_1 = 13;
export default class ReflectorD extends Reflector {
    wirings = '';
    #reflectorDWirings = [
        [PERMANENTLY_WIRED_0, PERMANENTLY_WIRED_1],
    ];
    plugWire(position1, position2) {
        if (this.#reflectorDWirings.length >= COUPLES) {
            throw new Error('All plugs have been wired');
        }
        if (!this.arePlugsWireable(position1, position2)) {
            throw new Error('This couple is permanently wired and therefore cannot be plugged');
        }
        if (position1 === position2) {
            throw new Error('Cannot wire the same letter');
        }
        if (!(position1 >= LOWER_LIMIT &&
            position1 < UPPER_LIMIT &&
            position2 >= LOWER_LIMIT &&
            position2 < UPPER_LIMIT)) {
            throw new Error('Wiring indexes out of bounds');
        }
        for (let i = 0; i < this.#reflectorDWirings.length; i += 1) {
            const [wiredPosition1, wiredPosition2] = this.#reflectorDWirings[i];
            if (wiredPosition1 === position1 ||
                wiredPosition2 === position1 ||
                wiredPosition1 === position2 ||
                wiredPosition2 === position2) {
                throw new Error('At least one of the plugs is already wired');
            }
        }
        this.#reflectorDWirings.push([position1, position2]);
    }
    arePlugsWireable(position1, position2) {
        return !((position1 === PERMANENTLY_WIRED_0 &&
            position2 === PERMANENTLY_WIRED_1) ||
            (position1 === PERMANENTLY_WIRED_1 && position2 === PERMANENTLY_WIRED_0));
    }
    unplugWire(position1, position2) {
        if (!this.arePlugsWireable(position1, position2)) {
            throw new Error('This couple is permanently wired and therefore cannot be unplugged');
        }
        for (let i = 0; i < this.#reflectorDWirings.length; i += 1) {
            const [wiredPosition1, wiredPosition2] = this.#reflectorDWirings[i];
            if ((wiredPosition1 === position1 && wiredPosition2 === position2) ||
                (wiredPosition1 === position2 && wiredPosition2 === position1)) {
                this.#reflectorDWirings.splice(i, 1);
            }
        }
    }
    pinToPin(inputPin) {
        for (let i = 0; i < this.#reflectorDWirings.length; i += 1) {
            const [wiredPosition1, wiredPosition2] = this.#reflectorDWirings[i];
            if (wiredPosition1 === inputPin) {
                return wiredPosition2;
            }
            else if (wiredPosition2 === inputPin) {
                return wiredPosition1;
            }
        }
        throw new Error('This pin is not wired');
    }
    getReflectedLetter() {
        throw new Error('This method has various interpretations on this reflector');
    }
    getIndexFromGermanNotation(letter) {
        // const normalizedLetter = normalizeInput(letter);
        let index = getIndex(letter);
        if (index === 9 || index === 24) {
            throw new Error('J and Y letters do not appear in German notation');
        }
        if ((index > 8 && index < 13) || index === 25) {
            index -= 1;
        }
        return 25 - index;
    }
    getIndexFromAlliedNotation(letter) {
        // const normalizedLetter = normalizeInput(letter);
        const index = getIndex(letter);
        return getModularNumber(index + 25);
    }
    plugWireInGermanNotation(letter1, letter2) {
        this.plugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
    }
    unplugWireInGermanNotation(letter1, letter2) {
        this.unplugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
    }
    plugWireInAlliedNotation(letter1, letter2) {
        this.plugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
    }
    unplugWireInAlliedNotation(letter1, letter2) {
        this.unplugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
    }
}
