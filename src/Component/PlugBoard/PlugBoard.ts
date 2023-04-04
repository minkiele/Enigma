import Component from '../Component';
import { normalizeInput } from '../../lib/utils';
import Wire from './Wire/Wire';
import PlugBoardWire from './Wire/PlugBoardWire';

export type PlugBoardWireTuple = [string, string] | Wire;

export default class PlugBoard extends Component {
  #wirings: Array<Wire> = [];

  public plugWire(firstLetter: string, secondLetter: string): boolean;
  public plugWire(wire: Wire): boolean;
  public plugWire(fp: Wire | string, sp?: string): boolean {
    if (fp instanceof Wire && sp == null) {
      for (let i = 0; i < this.#wirings.length; i += 1) {
        const {
          firstLetter: wiringFirstLetter,
          secondLetter: wiringSecondLetter,
        } = this.#wirings[i];
        if (
          wiringFirstLetter === fp.firstLetter ||
          wiringSecondLetter === fp.secondLetter ||
          wiringSecondLetter === fp.firstLetter ||
          wiringFirstLetter === fp.secondLetter
        ) {
          return false;
        }
      }

      this.#wirings.push(fp);
      this.emit('change.wirePlugged', fp.firstLetter, fp.secondLetter);
      return true;
    } else if (typeof fp === 'string' && typeof sp === 'string') {
      return this.plugWire(new PlugBoardWire(fp, sp));
    }
    return false;
  }

  public unplugWire(firstLetter: string, secondLetter: string): boolean;
  public unplugWire(wire: Wire): boolean;
  public unplugWire(fp: Wire | string, sp?: string): boolean {
    if (fp instanceof Wire && sp == null) {
      for (let i = 0; i < this.#wirings.length; i += 1) {
        const {
          firstLetter: wiringFirstLetter,
          secondLetter: wiringSecondLetter,
        } = this.#wirings[i];
        if (
          (wiringFirstLetter === fp.firstLetter &&
            wiringSecondLetter === fp.secondLetter) ||
          (wiringSecondLetter === fp.firstLetter &&
            wiringFirstLetter === fp.secondLetter)
        ) {
          this.#wirings.splice(i, 1);
          this.emit('change.wireUnplugged', fp.firstLetter, fp.secondLetter);
          return true;
        }
      }
    } else if (typeof fp === 'string' && typeof sp === 'string') {
      return this.unplugWire(new PlugBoardWire(fp, sp));
    }
    return false;
  }

  public plugWires(wires: Array<PlugBoardWireTuple>): void {
    wires.forEach((wire) => {
      if (wire instanceof Array) {
        this.plugWire(wire[0], wire[1]);
      } else if (wire instanceof Wire) {
        this.plugWire(wire);
      }
    });
  }

  public unplugAllWires(): void {
    this.#wirings.splice(0, this.#wirings.length);
  }

  public getSwappedLetter(inputLetter: string): string {
    inputLetter = normalizeInput(inputLetter);

    for (let i = 0; i < this.#wirings.length; i += 1) {
      const swappedLetter = this.#wirings[i].swap(inputLetter);
      if (swappedLetter != null) {
        return swappedLetter;
      }
    }

    return inputLetter;
  }
}
