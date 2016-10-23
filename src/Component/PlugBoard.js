import Component from "../Component";
import {normalizeInput} from "../Utils";

export default class PlugBoard extends Component {

  constructor () {
    super();
    this.wirings = [];
  }

  plugWire (firstLetter, secondLetter) {

    firstLetter = normalizeInput(firstLetter);
    secondLetter = normalizeInput(secondLetter);

    if(firstLetter === secondLetter) {
      throw 'Cannot plug the same letter';
    }

    let wire = [firstLetter, secondLetter];
    this.wirings.push(wire);
  }

  unplugWire (firstLetter, secondLetter) {

    firstLetter = normalizeInput(firstLetter);
    secondLetter = normalizeInput(secondLetter);

    for(let i = 0; i < this.wirings.length; i += 1) {
      if((this.wirings[i][0] === firstLetter && this.wirings[i][1] === secondLetter) ||
        (this.wirings[i][1] === firstLetter && this.wirings[i][0] === secondLetter)){
        this.wirings.splice(i, 1);
        return true;
      }
    }

    return false;

  }

  plugWires (wires) {
    wires.forEach((wire) => {
      this.plugWire(wire[0], wire[1]);
    });
  }

  unplugAllWires () {
    this.wirings.splice(0, this.wirings.length);
  }

  getSwappedLetter (inputLetter) {

    inputLetter = normalizeInput(inputLetter);

    for(let i = 0; i < this.wirings.length; i += 1) {
      if(this.wirings[i][0] === inputLetter) {
        return this.wirings[i][1];
      } else if (this.wirings[i][1] === inputLetter) {
        return this.wirings[i][0];
      }
    }

    return inputLetter;

  }

}
