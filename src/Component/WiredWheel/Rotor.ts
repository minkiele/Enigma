import WiredWheel from '../WiredWheel';
import * as Utils from '../../Utils';

export default abstract class Rotor extends WiredWheel {
  public ringPosition: number;
  public notchPosition: string;

  public constructor() {
    super();
    this.setRingPosition(0);
  }

  public pinToPlate(inputPin: number): number {
    return Utils.getIndex(this.wirings, inputPin);
  }

  public plateToPin(outputPlate: number): number {
    return this.wirings.indexOf(Utils.getLetter(outputPlate));
  }

  public setRingPosition(ringPosition: number): void {
    this.ringPosition = ringPosition;
    this.emit('change.ringPositionSet', ringPosition);
  }

  public setRingSetting(ringSetting: string): void {
    this.setRingPosition(Utils.getIndex(ringSetting));
    this.emit('change.ringSettingSet', ringSetting);
  }

  public getOutputLetter(inputLetter: string): string {
    const normalizedInputLetter = inputLetter.toUpperCase();
    const inputIndex = Utils.getIndex(normalizedInputLetter);
    const normalizedInputIndex = Utils.getModularNumber(
      inputIndex - this.ringPosition
    );
    const normalizedOutputIndex = this.pinToPlate(normalizedInputIndex);
    const outputIndex = Utils.getModularNumber(
      normalizedOutputIndex + this.ringPosition
    );
    return Utils.getLetter(outputIndex);
  }

  public getInputLetter(outputLetter: string): string {
    const normalizedOutputLetter = outputLetter.toUpperCase();
    const outputIndex = Utils.getIndex(normalizedOutputLetter);
    const normalizedOutputIndex = Utils.getModularNumber(
      outputIndex + this.ringPosition
    );
    const normalizedInputIndex = this.plateToPin(normalizedOutputIndex);
    const inputIndex = Utils.getModularNumber(
      normalizedInputIndex - this.ringPosition
    );
    return Utils.getLetter(inputIndex);
  }
}
