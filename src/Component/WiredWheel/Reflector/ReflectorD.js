import Reflector from '../Reflector';
import * as Utils from "../../../Utils";

const COUPLES = 13;
const LOWER_LIMIT = 0;
const UPPER_LIMIT = 26;
const PERMANENTLY_WIRED_0 = 0;
const PERMANENTLY_WIRED_1 = 13;

export default class ReflectorD extends Reflector {

  constructor () {
    super();
    this.wirings = [[PERMANENTLY_WIRED_0, PERMANENTLY_WIRED_1]];
  }

  plugWire (position1, position2) {

    if(this.wirings.length >= COUPLES) {
      throw 'All plugs have been wired';
    }

    if(!this.arePlugsWireable(position1, position2)){
      throw 'This couple is permanently wired and therefore cannot be plugged';
    }

    if(position1 === position2) {
      throw 'Cannot wire the same letter';
    }

    if(!(position1 >= LOWER_LIMIT && position1 < UPPER_LIMIT &&
      position2 >= LOWER_LIMIT && position2 < UPPER_LIMIT)) {
      throw 'Wiring indexes out of bounds';
    }

    for(let i = 0; i < this.wirings.length; i += 1) {
      if(this.wirings[i][0] === position1 ||
        this.wirings[i][1] === position1 ||
        this.wirings[i][0] === position2 ||
        this.wirings[i][1] === position2) {
        throw 'At least one of the plugs is already wired';
      }
    }

    this.wirings.push([position1, position2]);
    this.emit('change.wirePlugged', position1, position2);

  }

  arePlugsWireable(position1, position2) {
    return !((position1 === PERMANENTLY_WIRED_0 && position2 === PERMANENTLY_WIRED_1) ||
      (position1 === PERMANENTLY_WIRED_1 && position2 === PERMANENTLY_WIRED_0));
  }

  unplugWire (position1, position2) {

    if(!this.arePlugsWireable(position1, position2)){
      throw 'This couple is permanently wired and therefore cannot be unplugged';
    }

    for(let i = 0; i < this.wirings.length; i += 1) {
      if((this.wirings[i][0] === position1 &&
        this.wirings[i][1] === position2) ||
        (this.wirings[i][0] === position2 &&
        this.wirings[i][1] === position1)) {
        this.wirings.splice(i, 1);
        this.emit('change.wireUnplugged', position1, position2);
      }
    }

  }

  pinToPin (inputPin) {
    for(let i = 0; i < this.wirings.length; i += 1) {
      if(this.wirings[i][0] === inputPin) {
        return this.wirings[i][1];
      } else if(this.wirings[i][1] === inputPin) {
        return this.wirings[i][0];
      }
    }

    throw 'This pin is not wired';

  }

  getReflectedLetter (inputLetter) {
    throw 'This method has various interpretations on this reflector';
  }

  getIndexFromGermanNotation (letter) {

    let normalizedLetter = Utils.normalizeInput(letter);
    let index = Utils.getIndex(letter);

    if(index === 9 || index === 24) {
      throw 'J and Y letters do not appear in German notation';
    }

    if((index > 8 && index < 13) || index === 25) {
      index -= 1;
    }

    return 25 - index;

  }

  getIndexFromAlliedNotation (letter) {
    let normalizedLetter = Utils.normalizeInput(letter);
    let index = Utils.getIndex(letter);
    return Utils.getModularNumber(index + 25);
  }

//  getIndexFromEnigmaNotation(index) {
//    return index - 1;
//  }

  plugWireInGermanNotation (letter1, letter2) {
    this.plugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
  }

  unplugWireInGermanNotation (letter1, letter2) {
    this.unplugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
  }

  plugWireInAlliedNotation (letter1, letter2) {
    this.plugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
  }

  unplugWireInAlliedNotation (letter1, letter2) {
    this.unplugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
  }
}
