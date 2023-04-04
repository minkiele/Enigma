import Component from '../Component';
import Wire from './Wire/Wire';
export default class Uhr extends Component {
    #private;
    setUhrSetting(setting: number): void;
    getUhrSetting(): number;
    private getInnerPin;
    private getOuterPin;
    getBlackWire(redWire: number): number;
    getRedWire(blackWire: number): number;
    getUhrWire(index: number, firstLetter: string, secondLetter: string): Wire;
    private createUhrWire;
}
