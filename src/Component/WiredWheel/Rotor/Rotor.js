import WiredWheel from "../WiredWheel";
import * as Utils from "../../../Utils";

export default class Rotor extends WiredWheel {

  constructor () {
    super();
    this.setRingPosition(0);
  }

  pinToPlate(inputPin) {
    return Utils.getIndex(this.wirings, inputPin);
  }

  plateToPin(outputPlate) {
    return this.wirings.indexOf(Utils.getLetter(outputPlate));
  }

  setRingPosition(ringPosition) {
    this.ringPosition = ringPosition;
  }

  setRingSetting(ringSetting) {
    this.setRingPosition(Utils.getIndex(ringSetting));
  }

  getOutputLetter(inputLetter) {
    let normalizedInputLetter = inputLetter.toUpperCase();
    let inputIndex = Utils.getIndex(normalizedInputLetter);
    let normalizedInputIndex = Utils.getModularNumber(inputIndex - this.ringPosition);
    let normalizedOutputIndex = this.pinToPlate(normalizedInputIndex);
    let outputIndex = Utils.getModularNumber(normalizedOutputIndex + this.ringPosition);
    return Utils.getLetter(outputIndex);
  }

  getInputLetter(outputLetter) {
    let normalizedOutputLetter = outputLetter.toUpperCase();
    let outputIndex = Utils.getIndex(normalizedOutputLetter);
    let normalizedOutputIndex = Utils.getModularNumber(outputIndex + this.ringPosition);
    let normalizedInputIndex = this.plateToPin(outputIndex);
    let inputIndex = Utils.getModularNumber(normalizedInputIndex - this.ringPosition);
    return Utils.getLetter(inputIndex);
  }

}
