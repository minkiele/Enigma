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
    var normalizedInputLetter = inputLetter.toUpperCase();
    var inputIndex = normalizedInputLetter.charCodeAt(0) - A_INDEX;
    var normalizedInputIndex = (inputIndex + this.ringPosition) % 26;
    var normalizedOutputIndex = this.getOutputPlate(normalizedInputIndex);
    var outputIndex = (normalizedOutputIndex + 26 - this.ringPosition) % 26;
    return String.fromCharCode(outputIndex + A_INDEX);
  }

  getInputLetter(outputLetter) {
    var normalizedOutputLetter = outputLetter.toUpperCase();
    var outputIndex = normalizedOutputLetter.charCodeAt(0) - A_INDEX;
    var normalizedOutputIndex = (outputIndex + this.ringPosition) % 26;
    var normalizedInputIndex = this.getInputPin(outputIndex);
    var inputIndex = (normalizedInputIndex + 26 - this.ringPosition) % 26;
    return String.fromCharCode(inputIndex + A_INDEX);
  }

}
