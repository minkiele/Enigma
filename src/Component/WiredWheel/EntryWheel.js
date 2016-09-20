import WiredWheel from "./WiredWheel";
import {A_INDEX} from "../../Utils";

export default class EntryWheel {

  constructor () {

  }

  getPlateFromLetter (letter) {
    return letter.charCodeAt(0) - A_INDEX;
  }

  getLetterFromPlate (pin) {
    return String.fromCharCode(pin + A_INDEX);
  }

}
