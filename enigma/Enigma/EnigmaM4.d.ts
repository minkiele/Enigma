import Enigma from './Enigma';
export default class EnigmaM4 extends Enigma {
    constructor();
    protected encodeForward(inputLetter: string): number;
    protected encodeBackwards(reflectedPosition: number): string;
    private isClassicConfiguration;
    protected isMachineValidState(): boolean;
    static FOURTH_ROTOR: string;
}
