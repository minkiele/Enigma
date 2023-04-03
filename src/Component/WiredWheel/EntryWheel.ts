import WiredWheel from '../WiredWheel/WiredWheel';
import { getIndex, getLetter } from '../../lib/utils';

export default class EntryWheel extends WiredWheel {
  public getPlateFromLetter(letter: string): number {
    return getIndex(letter);
  }

  public getLetterFromPlate(plate: number): string {
    return getLetter(plate);
  }
}
