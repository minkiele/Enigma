import Component from '../Component';
import Wire from './Wire/Wire';
export declare type PlugBoardWireTuple = [string, string, Wire];
export default class PlugBoard extends Component {
    #private;
    plugWire(firstLetter: string, secondLetter: string, wire?: Wire): boolean;
    unplugWire(firstLetter: string, secondLetter: string): boolean;
    plugWires(wires: Array<PlugBoardWireTuple>): void;
    unplugAllWires(): void;
    getSwappedLetter(inputLetter: string): string;
}
