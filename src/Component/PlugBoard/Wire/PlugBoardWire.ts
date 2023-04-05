import Wire from './Wire';

export default class PlugBoardWire extends Wire {
  private swap(letter: string): string | undefined {
    if (letter === this.firstLetter) {
      return this.secondLetter;
    } else if (letter === this.secondLetter) {
      return this.firstLetter;
    }
    return undefined;
  }
  // Since the plugboard is reciprocal the swap method is the same
  // Forward and backwards
  public swapForward = this.swap.bind(this);
  public swapBackward = this.swap.bind(this);
}
