import WiredWheel from '../../WiredWheel/WiredWheel';
export default abstract class Rotor extends WiredWheel {
    ringPosition: number;
    notchPosition: string;
    constructor();
    pinToPlate(inputPin: number): number;
    plateToPin(outputPlate: number): number;
    setRingPosition(ringPosition: number): void;
    setRingSetting(ringSetting: string): void;
    getOutputLetter(inputLetter: string): string;
    getInputLetter(outputLetter: string): string;
}
