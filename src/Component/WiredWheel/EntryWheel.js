import WiredWheel from "../WiredWheel";
import * as Utils from "../../Utils";

export default class EntryWheel extends WiredWheel {

  getPlateFromLetter (letter) {
    return Utils.getIndex(letter);
  }

  getLetterFromPlate (plate) {
    return Utils.getLetter(plate);
  }

}
