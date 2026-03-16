import { getModularNumber } from '../../lib/utils.js';
import Wire from './Wire/Wire.js';
const scramblerWirings = [
    6, 31, 4, 29, 18, 39, 16, 25, 30, 23, 28, 1, 38, 11, 36, 37, 26, 27, 24, 21,
    14, 3, 12, 17, 2, 7, 0, 33, 10, 35, 8, 5, 22, 19, 20, 13, 34, 15, 32, 9,
];
const blackWires = [6, 0, 7, 5, 1, 8, 4, 2, 9, 3];
export default class Uhr {
    #wires = {};
    #setting = 0;
    setUhrSetting(setting) {
        this.#setting = getModularNumber(setting, scramblerWirings.length);
    }
    getUhrSetting() {
        return this.#setting;
    }
    getInnerPin(outerPin) {
        return getModularNumber(scramblerWirings[getModularNumber(outerPin + this.#setting, scramblerWirings.length)] - this.#setting, scramblerWirings.length);
    }
    getOuterPin(innerPin) {
        const normalizedInnerPin = getModularNumber(innerPin + this.#setting, scramblerWirings.length);
        const outerPin = scramblerWirings.indexOf(normalizedInnerPin);
        return getModularNumber(outerPin - this.#setting, scramblerWirings.length);
    }
    getIngoingBlackWire(redWire) {
        const outerInputPin = (redWire - 1) * 4;
        const innerOutputPin = this.getInnerPin(outerInputPin);
        return blackWires[(innerOutputPin - 2) / 4] + 1;
    }
    getOutgoingBlackWire(redWire) {
        const outerInputPin = (redWire - 1) * 4 + 2;
        const innerOutputPin = this.getInnerPin(outerInputPin);
        return blackWires[innerOutputPin / 4] + 1;
    }
    getIngoingRedWire(blackWire) {
        const innerInputPin = blackWires.indexOf(blackWire - 1) * 4;
        const outerOutputPin = this.getOuterPin(innerInputPin);
        return (outerOutputPin - 2) / 4 + 1;
    }
    getOutgoingRedWire(blackWire) {
        const innerInputPin = blackWires.indexOf(blackWire - 1) * 4 + 2;
        const outerOutputPin = this.getOuterPin(innerInputPin);
        return outerOutputPin / 4 + 1;
    }
    getUhrWire(index) {
        return this.#wires[index];
    }
    getUhrWires() {
        return Object.keys(this.#wires)
            .sort((a, b) => Number(b) - Number(a))
            .map((key) => this.#wires[Number(key)]);
    }
    prepareUhrWire(index, firstLetter, secondLetter) {
        const getUhr = () => this;
        const wire = new (class extends Wire {
            swapForward(letter) {
                const uhr = getUhr();
                if (letter === this.firstLetter) {
                    return uhr.#wires[uhr.getIngoingBlackWire(index)].secondLetter;
                }
                else if (letter === this.secondLetter) {
                    return uhr.#wires[uhr.getIngoingRedWire(index)].firstLetter;
                }
                throw new Error('Unmatched swap');
            }
            swapBackward(letter) {
                const uhr = getUhr();
                if (letter === this.firstLetter) {
                    return uhr.#wires[uhr.getOutgoingBlackWire(index)].secondLetter;
                }
                else if (letter === this.secondLetter) {
                    return uhr.#wires[uhr.getOutgoingRedWire(index)].firstLetter;
                }
                throw new Error('Unmatched swap');
            }
        })(firstLetter, secondLetter);
        this.#wires[index] = wire;
        return wire;
    }
    prepareUhrWires(wirings) {
        wirings.forEach(([firstLetter, secondLetter], index) => {
            this.prepareUhrWire(index + 1, firstLetter, secondLetter);
        });
    }
}
