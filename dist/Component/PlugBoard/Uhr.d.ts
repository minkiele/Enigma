import Component from '../Component';
import Wire from './Wire/Wire';
declare type UhrWiring = [string, string];
export default class Uhr extends Component {
    #private;
    setUhrSetting(setting: number): void;
    getUhrSetting(): number;
    private getInnerPin;
    private getOuterPin;
    private getBlackWire;
    private getRedWire;
    getUhrWire(index: number): Wire;
    getUhrWires(): Array<Wire>;
    prepareUhrWire(index: number, firstLetter: string, secondLetter: string): Wire;
    prepareUhrWires(wirings: Array<UhrWiring>): void;
}
export {};