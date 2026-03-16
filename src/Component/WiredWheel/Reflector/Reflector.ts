import WiredWheel from '../../WiredWheel/WiredWheel.js';
import { getIndex, getLetter } from '../../../lib/utils.js';

export default abstract class Reflector extends WiredWheel {
  public pinToPin(inputPin: number): number {
    return getIndex(this.wirings, inputPin);
  }

  public getReflectedLetter(inputLetter: string): string {
    const normalizedInputLetter = inputLetter.toUpperCase();
    const inputIndex = getIndex(normalizedInputLetter);
    const outputIndex = this.pinToPin(inputIndex);
    return getLetter(outputIndex);
  }
}
