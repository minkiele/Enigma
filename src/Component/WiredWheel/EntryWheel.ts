import WiredWheel from '../WiredWheel/WiredWheel.js';
import { getIndex, getLetter } from '../../lib/utils.js';

export default class EntryWheel extends WiredWheel {
  protected wirings = '';
  public getPlateFromLetter(letter: string): number {
    return getIndex(letter);
  }

  public getLetterFromPlate(plate: number): string {
    return getLetter(plate);
  }
}
