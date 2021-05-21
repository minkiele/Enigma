import WiredWheel from '../WiredWheel';
import { getIndex, getLetter } from '../../Utils';

export default class EntryWheel extends WiredWheel {
  public getPlateFromLetter(letter: string): number {
    return getIndex(letter);
  }

  public getLetterFromPlate(plate: number): string {
    return getLetter(plate);
  }
}
