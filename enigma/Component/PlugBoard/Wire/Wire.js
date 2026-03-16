import { normalizeInput } from '../../../lib/utils.js';
export default class Wire {
    firstLetter;
    secondLetter;
    constructor(firstLetter, secondLetter) {
        this.firstLetter = normalizeInput(firstLetter);
        this.secondLetter = normalizeInput(secondLetter);
        if (this.firstLetter === this.secondLetter) {
            throw new Error('Plugging the same letter');
        }
    }
}
