import Reflector from './Reflector';
import { getIndex, getModularNumber } from '../../../lib/utils';

const COUPLES = 13;
const LOWER_LIMIT = 0;
const UPPER_LIMIT = 26;
const PERMANENTLY_WIRED_0 = 0;
const PERMANENTLY_WIRED_1 = 13;

export type ReflectorDWiring = [number, number];

export default class ReflectorD extends Reflector {
  #reflectorDWirings: Array<ReflectorDWiring> = [
    [PERMANENTLY_WIRED_0, PERMANENTLY_WIRED_1],
  ];

  public plugWire(position1: number, position2: number): void {
    if (this.#reflectorDWirings.length >= COUPLES) {
      throw 'All plugs have been wired';
    }

    if (!this.arePlugsWireable(position1, position2)) {
      throw 'This couple is permanently wired and therefore cannot be plugged';
    }

    if (position1 === position2) {
      throw 'Cannot wire the same letter';
    }

    if (
      !(
        position1 >= LOWER_LIMIT &&
        position1 < UPPER_LIMIT &&
        position2 >= LOWER_LIMIT &&
        position2 < UPPER_LIMIT
      )
    ) {
      throw 'Wiring indexes out of bounds';
    }

    for (let i = 0; i < this.#reflectorDWirings.length; i += 1) {
      const [wiredPosition1, wiredPosition2] = this.#reflectorDWirings[i];
      if (
        wiredPosition1 === position1 ||
        wiredPosition2 === position1 ||
        wiredPosition1 === position2 ||
        wiredPosition2 === position2
      ) {
        throw 'At least one of the plugs is already wired';
      }
    }

    this.#reflectorDWirings.push([position1, position2]);
    this.getEventEmitter()?.emit('change.wirePlugged', position1, position2);
  }

  public arePlugsWireable(position1: number, position2: number): boolean {
    return !(
      (position1 === PERMANENTLY_WIRED_0 &&
        position2 === PERMANENTLY_WIRED_1) ||
      (position1 === PERMANENTLY_WIRED_1 && position2 === PERMANENTLY_WIRED_0)
    );
  }

  public unplugWire(position1: number, position2: number): void {
    if (!this.arePlugsWireable(position1, position2)) {
      throw 'This couple is permanently wired and therefore cannot be unplugged';
    }

    for (let i = 0; i < this.#reflectorDWirings.length; i += 1) {
      const [wiredPosition1, wiredPosition2] = this.#reflectorDWirings[i];
      if (
        (wiredPosition1 === position1 && wiredPosition2 === position2) ||
        (wiredPosition1 === position2 && wiredPosition2 === position1)
      ) {
        this.#reflectorDWirings.splice(i, 1);
        this.getEventEmitter()?.emit(
          'change.wireUnplugged',
          position1,
          position2
        );
      }
    }
  }

  public pinToPin(inputPin: number): number {
    for (let i = 0; i < this.#reflectorDWirings.length; i += 1) {
      const [wiredPosition1, wiredPosition2] = this.#reflectorDWirings[i];
      if (wiredPosition1 === inputPin) {
        return wiredPosition2;
      } else if (wiredPosition2 === inputPin) {
        return wiredPosition1;
      }
    }

    throw 'This pin is not wired';
  }

  public getReflectedLetter(): never {
    throw 'This method has various interpretations on this reflector';
  }

  public getIndexFromGermanNotation(letter: string): number {
    // const normalizedLetter = normalizeInput(letter);
    let index = getIndex(letter);

    if (index === 9 || index === 24) {
      throw 'J and Y letters do not appear in German notation';
    }

    if ((index > 8 && index < 13) || index === 25) {
      index -= 1;
    }

    return 25 - index;
  }

  public getIndexFromAlliedNotation(letter: string): number {
    // const normalizedLetter = normalizeInput(letter);
    const index = getIndex(letter);
    return getModularNumber(index + 25);
  }

  public plugWireInGermanNotation(letter1: string, letter2: string): void {
    this.plugWire(
      this.getIndexFromGermanNotation(letter1),
      this.getIndexFromGermanNotation(letter2)
    );
  }

  public unplugWireInGermanNotation(letter1: string, letter2: string): void {
    this.unplugWire(
      this.getIndexFromGermanNotation(letter1),
      this.getIndexFromGermanNotation(letter2)
    );
  }

  public plugWireInAlliedNotation(letter1: string, letter2: string): void {
    this.plugWire(
      this.getIndexFromAlliedNotation(letter1),
      this.getIndexFromAlliedNotation(letter2)
    );
  }

  public unplugWireInAlliedNotation(letter1: string, letter2: string): void {
    this.unplugWire(
      this.getIndexFromAlliedNotation(letter1),
      this.getIndexFromAlliedNotation(letter2)
    );
  }
}
