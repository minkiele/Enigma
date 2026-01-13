import Wire from './Wire';
export default class PlugBoardWire extends Wire {
    swap(letter) {
        if (letter === this.firstLetter) {
            return this.secondLetter;
        }
        else if (letter === this.secondLetter) {
            return this.firstLetter;
        }
        return undefined;
    }
    // Since the plugboard is reciprocal the swap method is the same
    // Forward and backwards
    swapForward = this.swap.bind(this);
    swapBackward = this.swap.bind(this);
}
