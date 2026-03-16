import PlugBoard from '../Component/PlugBoard/PlugBoard.js';
import EntryWheel from '../Component/WiredWheel/EntryWheel.js';
import Rotor from '../Component/WiredWheel/Rotor/Rotor.js';
import Reflector from '../Component/WiredWheel/Reflector/Reflector.js';
/**
 * Enigma M3 Implementation.
 * To make it operational you must at least set the 3 rotors
 * and the reflector. Plugs are optional.
 */
export default class Enigma {
    protected plugBoard: PlugBoard;
    protected entryWheel: EntryWheel;
    protected rotors: Record<string, Rotor | null>;
    protected rotorsWindowLetter: Record<string, string>;
    protected reflector: Reflector | null;
    constructor();
    getPlugBoard(): PlugBoard;
    setRotor(rotor: Rotor | null, position: string): this;
    getRotor(position: string): Rotor | null;
    unsetRotor(position: string): this;
    getReflector(): Reflector | null;
    setReflector(reflector: Reflector): this;
    unsetReflector(): this;
    setRotorWindowLetter(letter: string, position: string): this;
    getRotorWindowLetter(position: string): string;
    private isRotorInNotchPosition;
    private advanceRotor;
    advanceRotors(): this;
    protected encodeForward(inputLetter: string): number;
    private encodeReflect;
    protected encodeBackwards(reflectedPosition: number): string;
    getEncodedLetter(inputLetter: string): string;
    getRotorInputPosition(inputPosition: number, rotor: string): number;
    getRotorOutputPosition(outputPosition: number, rotor: string): number;
    encode(string: string): string;
    protected isMachineValidState(): boolean;
    static LEFT_ROTOR: string;
    static CENTER_ROTOR: string;
    static RIGHT_ROTOR: string;
}
