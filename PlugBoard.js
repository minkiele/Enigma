export default class PlugBoard {

  constructor () {
    this.wirings = [];
  }

  plugWire(firstLetter, secondLetter){
    var wire = [firstLetter, secondLetter];
    this.wirings.push(wire);
  }

  getSwappedLetter(inputLetter) {
    var normalizedInputLetter = inputLetter.toUpperCase();
    for(var i = 0; i < this.wirings.length; i += 1) {
      if(this.wirings[i][0] === inputLetter) {
        return this.wirings[i][1];
      } else if (this.wirings[i][1] === inputLetter) {
        return this.wirings[i][0];
      }
    }

    return normalizedInputLetter;

  }

}
