import WiredWheel from '../WiredWheel/WiredWheel';
export default class EntryWheel extends WiredWheel {
    getPlateFromLetter(letter: string): number;
    getLetterFromPlate(plate: number): string;
}
