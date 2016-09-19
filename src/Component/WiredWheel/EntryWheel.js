import WiredWheel from "./WiredWheel";
import {A_INDEX} from "../../Utils";

export default class EntryWheel {

  constructor () {

  }

  getPinFromLetter (letter) {
    return letter.charCodeAt(0) - A_INDEX;
  }

  getLetterFromPin (pin) {
    return String.fromCharCode(pin + A_INDEX);
  }

}
