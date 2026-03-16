import WiredWheel from '../WiredWheel/WiredWheel.js';
export default class EntryWheel extends WiredWheel {
    protected wirings: string;
    getPlateFromLetter(letter: string): number;
    getLetterFromPlate(plate: number): string;
}
