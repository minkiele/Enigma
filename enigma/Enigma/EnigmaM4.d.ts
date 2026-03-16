import Enigma from './Enigma.js';
/**
 * Implementation of an Enigma M4. It can operate either
 * with the classic configuration (3 rotors + 1 reflector) or
 * with the M4 configuration (3 rotors + 1 thin rotor + 1 thin reflector)
 */
export default class EnigmaM4 extends Enigma {
    constructor();
    protected encodeForward(inputLetter: string): number;
    protected encodeBackwards(reflectedPosition: number): string;
    private isClassicConfiguration;
    protected isMachineValidState(): boolean;
    static FOURTH_ROTOR: string;
}
