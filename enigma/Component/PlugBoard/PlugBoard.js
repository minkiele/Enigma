import { normalizeInput } from '../../lib/utils.js';
import Wire from './Wire/Wire.js';
import PlugBoardWire from './Wire/PlugBoardWire.js';
const DIRECTION_FORWARD = 'F';
const DIRECTION_BACKWARDS = 'B';
export default class PlugBoard {
    static DIRECTION_FORWARD = DIRECTION_FORWARD;
    static DIRECTION_BACKWARDS = DIRECTION_BACKWARDS;
    #wirings = [];
    plugWire(fp, sp) {
        if (fp instanceof Wire && sp == null) {
            for (let i = 0; i < this.#wirings.length; i += 1) {
                const { firstLetter: wiringFirstLetter, secondLetter: wiringSecondLetter, } = this.#wirings[i];
                if (wiringFirstLetter === fp.firstLetter ||
                    wiringSecondLetter === fp.secondLetter ||
                    wiringSecondLetter === fp.firstLetter ||
                    wiringFirstLetter === fp.secondLetter) {
                    return false;
                }
            }
            this.#wirings.push(fp);
            return true;
        }
        else if (typeof fp === 'string' && typeof sp === 'string') {
            return this.plugWire(new PlugBoardWire(fp, sp));
        }
        return false;
    }
    unplugWire(fp, sp) {
        if (fp instanceof Wire && sp == null) {
            for (let i = 0; i < this.#wirings.length; i += 1) {
                const { firstLetter: wiringFirstLetter, secondLetter: wiringSecondLetter, } = this.#wirings[i];
                if ((wiringFirstLetter === fp.firstLetter &&
                    wiringSecondLetter === fp.secondLetter) ||
                    (wiringSecondLetter === fp.firstLetter &&
                        wiringFirstLetter === fp.secondLetter)) {
                    this.#wirings.splice(i, 1);
                    return true;
                }
            }
        }
        else if (typeof fp === 'string' && typeof sp === 'string') {
            return this.unplugWire(new PlugBoardWire(fp, sp));
        }
        return false;
    }
    plugWires(wires) {
        wires.forEach((wire) => {
            if (wire instanceof Array) {
                this.plugWire(wire[0], wire[1]);
            }
            else if (wire instanceof Wire) {
                this.plugWire(wire);
            }
        });
    }
    unplugAllWires() {
        this.#wirings.splice(0, this.#wirings.length);
    }
    getSwappedLetter(inputLetter, direction) {
        inputLetter = normalizeInput(inputLetter);
        for (let i = 0; i < this.#wirings.length; i += 1) {
            const swappedLetter = direction === DIRECTION_FORWARD
                ? this.#wirings[i].swapForward(inputLetter)
                : this.#wirings[i].swapBackward(inputLetter);
            if (swappedLetter != null) {
                return swappedLetter;
            }
        }
        return inputLetter;
    }
}
