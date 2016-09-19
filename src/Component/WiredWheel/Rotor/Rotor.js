import WiredWheel from "../WiredWheel";
import {A_INDEX} from "../../../Utils";

export default class Rotor extends WiredWheel {

  constructor () {
    super();
    this.setRingPosition(0);
  }

  getOutputPlate(inputPin) {
    return this.wirings.charCodeAt(inputPin) - A_INDEX;
  }

  getInputPin(outputPlate) {
    return this.wirings.indexOf(String.fromCharCode(outputPlate + A_INDEX));
  }

  setRingPosition(ringPosition) {
    this.ringPosition = ringPosition;
  }

  setRingSetting(ringSetting) {
    this.ringPosition = ringSetting.charCodeAt(0) - A_INDEX;
  }

  getOutputLetter(inputLetter) {
    let normalizedInputLetter = inputLetter.toUpperCase();
    let inputIndex = normalizedInputLetter.charCodeAt(0) - A_INDEX;
    let normalizedInputIndex = (inputIndex + this.ringPosition) % 26;
    let normalizedOutputIndex = this.getOutputPlate(normalizedInputIndex);
    let outputIndex = (normalizedOutputIndex + 26 - this.ringPosition) % 26;
    return String.fromCharCode(outputIndex + A_INDEX);
  }

  getInputLetter(outputLetter) {
    let normalizedOutputLetter = outputLetter.toUpperCase();
    let outputIndex = normalizedOutputLetter.charCodeAt(0) - A_INDEX;
    let normalizedOutputIndex = (outputIndex + this.ringPosition) % 26;
    let normalizedInputIndex = this.getInputPin(outputIndex);
    let inputIndex = (normalizedInputIndex + 26 - this.ringPosition) % 26;
    return String.fromCharCode(inputIndex + A_INDEX);
  }

}
