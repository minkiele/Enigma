import Reflector from './Reflector';
export type ReflectorDWiring = [number, number];
export default class ReflectorD extends Reflector {
    #private;
    plugWire(position1: number, position2: number): void;
    arePlugsWireable(position1: number, position2: number): boolean;
    unplugWire(position1: number, position2: number): void;
    pinToPin(inputPin: number): number;
    getReflectedLetter(): never;
    getIndexFromGermanNotation(letter: string): number;
    getIndexFromAlliedNotation(letter: string): number;
    plugWireInGermanNotation(letter1: string, letter2: string): void;
    unplugWireInGermanNotation(letter1: string, letter2: string): void;
    plugWireInAlliedNotation(letter1: string, letter2: string): void;
    unplugWireInAlliedNotation(letter1: string, letter2: string): void;
}
