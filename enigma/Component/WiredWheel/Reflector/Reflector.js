import WiredWheel from '../../WiredWheel/WiredWheel';
import { getIndex, getLetter } from '../../../lib/utils';
export default class Reflector extends WiredWheel {
    pinToPin(inputPin) {
        return getIndex(this.wirings, inputPin);
    }
    getReflectedLetter(inputLetter) {
        const normalizedInputLetter = inputLetter.toUpperCase();
        const inputIndex = getIndex(normalizedInputLetter);
        const outputIndex = this.pinToPin(inputIndex);
        return getLetter(outputIndex);
    }
}
