import Component from "../Component";

export default class PlugBoard extends Component {

  constructor () {
    super();
    this.wirings = [];
  }

  plugWire(firstLetter, secondLetter){
    let wire = [firstLetter, secondLetter];
    this.wirings.push(wire);
  }

  getSwappedLetter(inputLetter) {
    let normalizedInputLetter = inputLetter.toUpperCase();
    for(let i = 0; i < this.wirings.length; i += 1) {
      if(this.wirings[i][0] === inputLetter) {
        return this.wirings[i][1];
      } else if (this.wirings[i][1] === inputLetter) {
        return this.wirings[i][0];
      }
    }

    return normalizedInputLetter;

  }

}
