import WiredWheel from '../WiredWheel';
import * as Utils from '../../Utils';

export default abstract class Reflector extends WiredWheel {
  public pinToPin(inputPin: number): number {
    return Utils.getIndex(this.wirings, inputPin);
  }

  public getReflectedLetter(inputLetter: string): string {
    const normalizedInputLetter = inputLetter.toUpperCase();
    const inputIndex = Utils.getIndex(normalizedInputLetter);
    const outputIndex = this.pinToPin(inputIndex);
    return Utils.getLetter(outputIndex);
  }
}
