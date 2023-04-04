import Component from '../../Component';

export default abstract class Wire extends Component {
  public constructor(public firstLetter: string, public secondLetter: string) {
    super();
  }
  public abstract encode(letter: string): string;
}
