import Component from '../Component.js';
import Wire from './Wire/Wire.js';
type UhrWiring = [string, string];
export default class Uhr implements Component {
    #private;
    setUhrSetting(setting: number): void;
    getUhrSetting(): number;
    private getInnerPin;
    private getOuterPin;
    private getIngoingBlackWire;
    private getOutgoingBlackWire;
    private getIngoingRedWire;
    private getOutgoingRedWire;
    getUhrWire(index: number): Wire;
    getUhrWires(): Array<Wire>;
    prepareUhrWire(index: number, firstLetter: string, secondLetter: string): Wire;
    prepareUhrWires(wirings: Array<UhrWiring>): void;
}
export {};
