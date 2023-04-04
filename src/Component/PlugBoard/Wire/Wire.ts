import { normalizeInput } from '../../../lib/utils';
import Component from '../../Component';

export default abstract class Wire extends Component {
  public firstLetter: string;
  public secondLetter: string;
  public constructor(firstLetter: string, secondLetter: string) {
    super();
    this.firstLetter = normalizeInput(firstLetter);
    this.secondLetter = normalizeInput(secondLetter);

    if (this.firstLetter === this.secondLetter) {
      throw new Error('Plugging the same letter');
    }
  }
  public abstract swap(letter: string): string;
}
