import Component from '../Component';
import { normalizeInput } from '../../lib/utils';

export type PlugBoardWire = [string, string];

export default class PlugBoard extends Component {
  #wirings: Array<PlugBoardWire> = [];

  public plugWire(firstLetter: string, secondLetter: string): boolean {
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

    const wire: PlugBoardWire = [firstLetter, secondLetter];
    this.#wirings.push(wire);
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

  public plugWires(wires: Array<PlugBoardWire>): void {
    wires.forEach((wire) => {
      this.plugWire(wire[0], wire[1]);
    });
  }

  public unplugAllWires(): void {
    this.#wirings.splice(0, this.#wirings.length);
  }

  public getSwappedLetter(inputLetter: string): string {
    inputLetter = normalizeInput(inputLetter);

    for (let i = 0; i < this.#wirings.length; i += 1) {
      const [wiringFirstLetter, wiringSecondLetter] = this.#wirings[i];
      if (wiringFirstLetter === inputLetter) {
        return wiringSecondLetter;
      } else if (wiringSecondLetter === inputLetter) {
        return wiringFirstLetter;
      }
    }

    return inputLetter;
  }
}
