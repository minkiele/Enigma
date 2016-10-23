import WiredWheel from "../WiredWheel";
import {getIndex, getLetter} from "../../Utils";

export default class EntryWheel extends WiredWheel {

  getPlateFromLetter (letter) {
    return getIndex(letter);
  }

  getLetterFromPlate (plate) {
    return getLetter(plate);
  }

}
