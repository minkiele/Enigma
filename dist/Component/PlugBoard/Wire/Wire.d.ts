import Component from '../../Component';
export default abstract class Wire extends Component {
    firstLetter: string;
    secondLetter: string;
    constructor(firstLetter: string, secondLetter: string);
    abstract encode(letter: string): string;
}
