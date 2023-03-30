import Component from '../Component';
export declare type PlugBoardWire = [string, string];
export default class PlugBoard extends Component {
    private wirings;
    plugWire(firstLetter: string, secondLetter: string): boolean;
    unplugWire(firstLetter: string, secondLetter: string): boolean;
    plugWires(wires: Array<PlugBoardWire>): void;
    unplugAllWires(): void;
    getSwappedLetter(inputLetter: string): string;
}
