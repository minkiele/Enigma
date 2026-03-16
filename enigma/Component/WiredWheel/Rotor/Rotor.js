import WiredWheel from '../../WiredWheel/WiredWheel.js';
import { getIndex, getLetter, getModularNumber } from '../../../lib/utils.js';
export default class Rotor extends WiredWheel {
    ringPosition = 0;
    constructor() {
        super();
        this.setRingPosition(0);
    }
    pinToPlate(inputPin) {
        return getIndex(this.wirings, inputPin);
    }
    plateToPin(outputPlate) {
        return this.wirings.indexOf(getLetter(outputPlate));
    }
    setRingPosition(ringPosition) {
        this.ringPosition = ringPosition;
    }
    setRingSetting(ringSetting) {
        this.setRingPosition(getIndex(ringSetting));
    }
    getOutputLetter(inputLetter) {
        const normalizedInputLetter = inputLetter.toUpperCase();
        const inputIndex = getIndex(normalizedInputLetter);
        const normalizedInputIndex = getModularNumber(inputIndex - this.ringPosition);
        const normalizedOutputIndex = this.pinToPlate(normalizedInputIndex);
        const outputIndex = getModularNumber(normalizedOutputIndex + this.ringPosition);
        return getLetter(outputIndex);
    }
    getInputLetter(outputLetter) {
        const normalizedOutputLetter = outputLetter.toUpperCase();
        const outputIndex = getIndex(normalizedOutputLetter);
        const normalizedOutputIndex = getModularNumber(outputIndex + this.ringPosition);
        const normalizedInputIndex = this.plateToPin(normalizedOutputIndex);
        const inputIndex = getModularNumber(normalizedInputIndex - this.ringPosition);
        return getLetter(inputIndex);
    }
}
