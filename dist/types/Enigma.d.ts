/// <reference types="node" />
import PlugBoard from './Component/PlugBoard';
import EntryWheel from './Component/WiredWheel/EntryWheel';
import Rotor from './Component/WiredWheel/Rotor';
import Reflector from './Component/WiredWheel/Reflector';
import EventEmitter from 'events';
export default class Enigma extends EventEmitter {
    protected plugBoard: PlugBoard;
    protected entryWheel: EntryWheel;
    protected rotors: Record<string, Rotor>;
    protected rotorsWindowLetter: Record<string, string>;
    protected reflector: Reflector;
    constructor();
    getPlugBoard(): PlugBoard;
    setRotor(rotor: Rotor, position: string): this;
    getRotor(position: string): Rotor;
    setReflector(reflector: Reflector): this;
    setRotorWindowLetter(letter: string, position: string): this;
    getRotorWindowLetter(position: string): string;
    isRotorInNotchPosition(position: string): boolean;
    advanceRotor(position: string): this;
    advanceRotors(): this;
    encodeForward(inputLetter: string): number;
    encodeReflect(leftRotorForwardOutputPosition: number): number;
    encodeBackwards(reflectedPosition: number): string;
    getEncodedLetter(inputLetter: string): string;
    getRotorInputPosition(inputPosition: number, rotor: string): number;
    getRotorOutputPosition(outputPosition: number, rotor: string): number;
    encode(string: string): string;
    isMachineValidState(): boolean;
    static LEFT_ROTOR: string;
    static CENTER_ROTOR: string;
    static RIGHT_ROTOR: string;
}
