import WiredWheel from "../WiredWheel";
import {A_INDEX} from "../../../Utils";

export default class Reflector extends WiredWheel {

  getReflectedPin(inputPin) {
    return this.wirings.charCodeAt(inputPin) - A_INDEX;
  }

  getReflectedLetter(inputLetter) {
    let normalizedInputLetter = inputLetter.toUpperCase();
    let inputIndex = normalizedInputLetter.charCodeAt(0) - A_INDEX;
    let outputIndex = this.getReflectedPin(inputIndex);
    return String.fromCharCode(outputIndex + A_INDEX);
  }

}
