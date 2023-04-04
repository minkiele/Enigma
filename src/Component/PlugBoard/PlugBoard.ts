import Component from '../Component';
import { normalizeInput } from '../../lib/utils';
import Wire from './Wire/Wire';
import PlugBoardWire from './Wire/PlugBoardWire';

export type PlugBoardWireTuple = [string, string, Wire];

export default class PlugBoard extends Component {
  #wirings: Array<PlugBoardWireTuple> = [];

  public plugWire(
    firstLetter: string,
    secondLetter: string,
    wire: Wire = new PlugBoardWire(firstLetter, secondLetter)
  ): boolean {
    firstLetter = normalizeInput(firstLetter);
    secondLetter = normalizeInput(secondLetter);

    if (firstLetter === secondLetter) {
      throw 'Cannot plug the same letter';
    }

    for (let i = 0; i < this.#wirings.length; i += 1) {
      const [wiringFirstLetter, wiringSecondLetter] = this.#wirings[i];
      if (
        wiringFirstLetter === firstLetter ||
        wiringSecondLetter === secondLetter ||
        wiringSecondLetter === firstLetter ||
        wiringFirstLetter === secondLetter
      ) {
        return false;
      }
    }

    const wiring: PlugBoardWireTuple = [firstLetter, secondLetter, wire];
    this.#wirings.push(wiring);
    this.emit('change.wirePlugged', firstLetter, secondLetter);
    return true;
  }

  public unplugWire(firstLetter: string, secondLetter: string): boolean {
    firstLetter = normalizeInput(firstLetter);
    secondLetter = normalizeInput(secondLetter);

    for (let i = 0; i < this.#wirings.length; i += 1) {
      const [wiringFirstLetter, wiringSecondLetter] = this.#wirings[i];
      if (
        (wiringFirstLetter === firstLetter &&
          wiringSecondLetter === secondLetter) ||
        (wiringSecondLetter === firstLetter &&
          wiringFirstLetter === secondLetter)
      ) {
        this.#wirings.splice(i, 1);
        this.emit('change.wireUnplugged', firstLetter, secondLetter);
        return true;
      }
    }

    return false;
  }

  public plugWires(wires: Array<PlugBoardWireTuple>): void {
    wires.forEach((wire) => {
      this.plugWire(wire[0], wire[1], wire[2]);
    });
  }

  public unplugAllWires(): void {
    this.#wirings.splice(0, this.#wirings.length);
  }

  public getSwappedLetter(inputLetter: string): string {
    inputLetter = normalizeInput(inputLetter);

    for (let i = 0; i < this.#wirings.length; i += 1) {
      const [wiringFirstLetter, wiringSecondLetter, wire] = this.#wirings[i];
      if (
        wiringFirstLetter === inputLetter ||
        wiringSecondLetter === inputLetter
      ) {
        return wire.encode(inputLetter);
      }
    }

    return inputLetter;
  }
}
