import WiredWheel from "./WiredWheel";
import * as Utils from "../../Utils";

export default class EntryWheel {

  constructor () {

  }

  getPlateFromLetter (letter) {
    return Utils.getIndex(letter);
  }

  getLetterFromPlate (pin) {
    return Utils.getLetter(pin);
  }

}
