import Enigma from './Enigma';
export default class EnigmaM4 extends Enigma {
    constructor();
    encodeForward(inputLetter: string): number;
    encodeBackwards(reflectedPosition: number): string;
    isClassicConfiguration(): boolean;
    isMachineValidState(): boolean;
    static FOURTH_ROTOR: string;
}
