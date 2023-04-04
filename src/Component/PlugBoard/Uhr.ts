import { getModularNumber } from '../../lib/utils';
import Component from '../Component';
import Wire from './Wire/Wire';

const scramblerWirings: Array<number> = [
  6, 31, 4, 29, 18, 39, 16, 25, 30, 23, 28, 1, 38, 11, 36, 37, 26, 27, 24, 21,
  14, 3, 12, 17, 2, 7, 0, 33, 10, 35, 8, 5, 22, 19, 20, 13, 34, 15, 32, 9,
];

const blackWires: Array<number> = [6, 0, 7, 5, 1, 8, 4, 2, 9, 3];

export default class Uhr extends Component {
  #wires: Record<number, Wire> = {};
  #setting = 0;
  public setUhrSetting(setting: number): void {
    this.#setting = getModularNumber(setting, scramblerWirings.length);
    this.emit('change.uhrSetting', this.#setting);
  }
  public getUhrSetting(): number {
    return this.#setting;
  }
  private getInnerPin(outerPin: number): number {
    return getModularNumber(
      scramblerWirings[
        getModularNumber(outerPin + this.#setting, scramblerWirings.length)
      ] - this.#setting,
      scramblerWirings.length
    );
  }
  private getOuterPin(innerPin: number): number {
    const normalizedInnerPin = getModularNumber(
      innerPin + this.#setting,
      scramblerWirings.length
    );
    const outerPin = scramblerWirings.indexOf(normalizedInnerPin);
    return getModularNumber(outerPin - this.#setting, scramblerWirings.length);
  }
  public getBlackWire(redWire: number): number {
    const outerInputPin = (redWire - 1) * 4;
    const innerOutputPin = this.getInnerPin(outerInputPin);
    return blackWires[(innerOutputPin - 2) / 4] + 1;
  }

  public getRedWire(blackWire: number): number {
    const innerInputPin = blackWires.indexOf(blackWire - 1) * 4;
    const outerOutputPin = this.getOuterPin(innerInputPin);
    return (outerOutputPin - 2) / 4 + 1;
  }
  public getUhrWire(
    index: number,
    firstLetter: string,
    secondLetter: string
  ): Wire {
    if (this.#wires[index] == null) {
      this.createUhrWire(index, firstLetter, secondLetter);
    }
    return this.#wires[index];
  }
  private createUhrWire(
    index: number,
    firstLetter: string,
    secondLetter: string
  ) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const uhr = this;
    const wire = new (class extends Wire {
      public encode(letter: string): string | undefined {
        if (letter === this.firstLetter) {
          return uhr.#wires[uhr.getBlackWire(index)].secondLetter;
        } else if (letter === this.secondLetter) {
          return uhr.#wires[uhr.getRedWire(index)].firstLetter;
        }
        return undefined;
      }
    })(firstLetter, secondLetter);
    this.#wires[index] = wire;
  }
}
