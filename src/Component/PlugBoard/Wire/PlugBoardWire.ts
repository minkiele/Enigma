import Wire from './Wire';

export default class PlugBoardWire extends Wire {
  public encode(letter: string): string | undefined {
    if (letter === this.firstLetter) {
      return this.secondLetter;
    } else if (letter === this.secondLetter) {
      return this.firstLetter;
    }
    return undefined;
  }
}
