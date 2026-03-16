import Wire from './Wire.js';
export default class PlugBoardWire extends Wire {
    private swap;
    swapForward: (letter: string) => string;
    swapBackward: (letter: string) => string;
}
