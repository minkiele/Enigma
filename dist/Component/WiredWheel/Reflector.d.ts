import WiredWheel from '../WiredWheel';
export default abstract class Reflector extends WiredWheel {
    pinToPin(inputPin: number): number;
    getReflectedLetter(inputLetter: string): string;
}
