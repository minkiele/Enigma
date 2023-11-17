import Component from '../../Component';
export default abstract class Wire implements Component {
    firstLetter: string;
    secondLetter: string;
    constructor(firstLetter: string, secondLetter: string);
    abstract swapForward(letter: string): string;
    abstract swapBackward(letter: string): string;
}
