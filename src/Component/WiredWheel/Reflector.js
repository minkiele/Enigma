import WiredWheel from "../WiredWheel";
import * as Utils from "../../Utils";

export default class Reflector extends WiredWheel {

  pinToPin(inputPin) {
    return Utils.getIndex(this.wirings, inputPin);
  }

  getReflectedLetter(inputLetter) {
    let normalizedInputLetter = inputLetter.toUpperCase();
    let inputIndex = Utils.getIndex(normalizedInputLetter);
    let outputIndex = this.pinToPin(inputIndex);
    return Utils.getLetter(outputIndex);
  }

}
