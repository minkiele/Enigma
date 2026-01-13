import WiredWheel from '../WiredWheel/WiredWheel';
import { getIndex, getLetter } from '../../lib/utils';
export default class EntryWheel extends WiredWheel {
    getPlateFromLetter(letter) {
        return getIndex(letter);
    }
    getLetterFromPlate(plate) {
        return getLetter(plate);
    }
}
