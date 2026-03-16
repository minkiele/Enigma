import WiredWheel from '../WiredWheel/WiredWheel.js';
import { getIndex, getLetter } from '../../lib/utils.js';
export default class EntryWheel extends WiredWheel {
    wirings = '';
    getPlateFromLetter(letter) {
        return getIndex(letter);
    }
    getLetterFromPlate(plate) {
        return getLetter(plate);
    }
}
