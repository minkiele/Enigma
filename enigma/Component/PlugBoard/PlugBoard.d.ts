import Component from '../Component';
import Wire from './Wire/Wire';
export type PlugBoardWireTuple = [string, string] | Wire;
export default class PlugBoard implements Component {
    #private;
    static DIRECTION_FORWARD: 'F' | 'B';
    static DIRECTION_BACKWARDS: 'F' | 'B';
    plugWire(firstLetter: string, secondLetter: string): boolean;
    plugWire(wire: Wire): boolean;
    unplugWire(firstLetter: string, secondLetter: string): boolean;
    unplugWire(wire: Wire): boolean;
    plugWires(wires: Array<PlugBoardWireTuple>): void;
    unplugAllWires(): void;
    getSwappedLetter(inputLetter: string, direction: 'F' | 'B'): string;
}
