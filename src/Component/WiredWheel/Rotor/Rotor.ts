import WiredWheel from '../../WiredWheel/WiredWheel.js';
import { getIndex, getLetter, getModularNumber } from '../../../lib/utils.js';

export default abstract class Rotor extends WiredWheel {
  public ringPosition = 0;
  public abstract notchPosition: string;

  public constructor() {
    super();
    this.setRingPosition(0);
  }

  public pinToPlate(inputPin: number): number {
    return getIndex(this.wirings, inputPin);
  }

  public plateToPin(outputPlate: number): number {
    return this.wirings.indexOf(getLetter(outputPlate));
  }

  public setRingPosition(ringPosition: number): void {
    this.ringPosition = ringPosition;
  }

  public setRingSetting(ringSetting: string): void {
    this.setRingPosition(getIndex(ringSetting));
  }

  public getOutputLetter(inputLetter: string): string {
    const normalizedInputLetter = inputLetter.toUpperCase();
    const inputIndex = getIndex(normalizedInputLetter);
    const normalizedInputIndex = getModularNumber(
      inputIndex - this.ringPosition,
    );
    const normalizedOutputIndex = this.pinToPlate(normalizedInputIndex);
    const outputIndex = getModularNumber(
      normalizedOutputIndex + this.ringPosition,
    );
    return getLetter(outputIndex);
  }

  public getInputLetter(outputLetter: string): string {
    const normalizedOutputLetter = outputLetter.toUpperCase();
    const outputIndex = getIndex(normalizedOutputLetter);
    const normalizedOutputIndex = getModularNumber(
      outputIndex + this.ringPosition,
    );
    const normalizedInputIndex = this.plateToPin(normalizedOutputIndex);
    const inputIndex = getModularNumber(
      normalizedInputIndex - this.ringPosition,
    );
    return getLetter(inputIndex);
  }
}
