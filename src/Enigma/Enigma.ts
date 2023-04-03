import PlugBoard from '../Component/PlugBoard/PlugBoard';
import {
  getNotchLetter,
  getNextLetter,
  getModularNumber,
  getIndex,
} from '../lib/utils';
import EntryWheel from '../Component/WiredWheel/EntryWheel';
import Rotor from '../Component/WiredWheel/Rotor/Rotor';
import Reflector from '../Component/WiredWheel/Reflector/Reflector';
import EventEmitter from '../lib/EventEmitter';

const LEFT_ROTOR = 'L';
const CENTER_ROTOR = 'C';
const RIGHT_ROTOR = 'R';

export default class Enigma extends EventEmitter {
  protected plugBoard = new PlugBoard();
  protected entryWheel = new EntryWheel();
  protected rotors: Record<string, Rotor> = {};
  protected rotorsWindowLetter: Record<string, string> = {};
  protected reflector: Reflector;

  public constructor() {
    super();
    this.setRotor(null, LEFT_ROTOR);
    this.setRotor(null, CENTER_ROTOR);
    this.setRotor(null, RIGHT_ROTOR);
  }

  public getPlugBoard(): PlugBoard {
    return this.plugBoard;
  }

  public setRotor(rotor: Rotor, position: string): this {
    this.rotors[position] = rotor;
    this.emit('change.rotorSet', rotor, position);
    this.setRotorWindowLetter('A', position);
    return this;
  }

  public getRotor(position: string): Rotor {
    return this.rotors[position];
  }

  public setReflector(reflector: Reflector): this {
    this.reflector = reflector;
    this.emit('change.reflectorSet', reflector);
    return this;
  }

  public setRotorWindowLetter(letter: string, position: string): this {
    this.rotorsWindowLetter[position] = letter;
    this.emit(
      'change.rotorWindowLetterSet',
      letter,
      position,
      this.getRotor(position)
    );
    return this;
  }

  public getRotorWindowLetter(position: string): string {
    return this.rotorsWindowLetter[position];
  }

  public isRotorInNotchPosition(position: string): boolean {
    const notchLetter: string = getNotchLetter(
      this.getRotorWindowLetter(position)
    );
    return this.getRotor(position).notchPosition.indexOf(notchLetter) > -1;
  }

  public advanceRotor(position: string): this {
    this.setRotorWindowLetter(
      getNextLetter(this.getRotorWindowLetter(position)),
      position
    );
    this.emit(
      'change.rotorAdvanced',
      position,
      this.getRotor(position),
      this.getRotorWindowLetter(position)
    );
    return this;
  }

  public advanceRotors(): this {
    const isCenterNotch: boolean = this.isRotorInNotchPosition(CENTER_ROTOR);
    const isRightNotch: boolean = this.isRotorInNotchPosition(RIGHT_ROTOR);
    if (isCenterNotch) {
      this.advanceRotor(LEFT_ROTOR);
    }
    //And that's how we deal with the double step
    if (isCenterNotch || isRightNotch) {
      this.advanceRotor(CENTER_ROTOR);
    }
    this.advanceRotor(RIGHT_ROTOR);
    this.emit('change.rotorsAdvanced');
    return this;
  }

  public encodeForward(inputLetter: string): number {
    //FORWARD THROUGH THE NON ROTATING PARTS
    const normalizedInputLetter: string = inputLetter.toUpperCase();
    const swappedInputLetter = this.plugBoard.getSwappedLetter(
      normalizedInputLetter
    );
    const entryWheelInputPosition =
      this.entryWheel.getPlateFromLetter(swappedInputLetter);

    //RIGHT ROTOR
    const rightRotorInputPin = this.getRotorInputPosition(
      entryWheelInputPosition,
      RIGHT_ROTOR
    );
    const rightRotorOutputPlate =
      this.getRotor(RIGHT_ROTOR).pinToPlate(rightRotorInputPin);
    const rightRotorForwardOutputPosition = this.getRotorOutputPosition(
      rightRotorOutputPlate,
      RIGHT_ROTOR
    );

    //CENTER ROTOR
    const centerRotorInputPin = this.getRotorInputPosition(
      rightRotorForwardOutputPosition,
      CENTER_ROTOR
    );
    const centerRotorOutputPlate =
      this.getRotor(CENTER_ROTOR).pinToPlate(centerRotorInputPin);
    const centerRotorForwardOutputPosition = this.getRotorOutputPosition(
      centerRotorOutputPlate,
      CENTER_ROTOR
    );

    //LEFT ROTOR
    const leftRotorInputPin = this.getRotorInputPosition(
      centerRotorForwardOutputPosition,
      LEFT_ROTOR
    );
    const leftRotorOutputPlate =
      this.getRotor(LEFT_ROTOR).pinToPlate(leftRotorInputPin);
    const leftRotorForwardOutputPosition = this.getRotorOutputPosition(
      leftRotorOutputPlate,
      LEFT_ROTOR
    );

    return leftRotorForwardOutputPosition;
  }

  public encodeReflect(leftRotorForwardOutputPosition: number): number {
    //REFLECTION
    const reflectedPosition = this.reflector.pinToPin(
      leftRotorForwardOutputPosition
    );
    //AND NOW BACKWARDS!

    return reflectedPosition;
  }

  public encodeBackwards(reflectedPosition: number): string {
    //LEFT ROTOR
    const leftRotorInputPlate = this.getRotorInputPosition(
      reflectedPosition,
      LEFT_ROTOR
    );
    const leftRotorOutputPin =
      this.getRotor(LEFT_ROTOR).plateToPin(leftRotorInputPlate);
    const leftRotorBackwardsOutputPosition = this.getRotorOutputPosition(
      leftRotorOutputPin,
      LEFT_ROTOR
    );

    //CENTER ROTOR
    const centerRotorInputPosition = this.getRotorInputPosition(
      leftRotorBackwardsOutputPosition,
      CENTER_ROTOR
    );
    const centerRotorOutputPin = this.getRotor(CENTER_ROTOR).plateToPin(
      centerRotorInputPosition
    );
    const centerRotorBackwardsOutputPosition = this.getRotorOutputPosition(
      centerRotorOutputPin,
      CENTER_ROTOR
    );

    //RIGHT ROTOR
    const rightRotorInputPlate = this.getRotorInputPosition(
      centerRotorBackwardsOutputPosition,
      RIGHT_ROTOR
    );
    const rightRotorOutputPin =
      this.getRotor(RIGHT_ROTOR).plateToPin(rightRotorInputPlate);
    const rightRotorBackwardsOutputPosition = this.getRotorOutputPosition(
      rightRotorOutputPin,
      RIGHT_ROTOR
    );

    //AND THROUGH AGAIN THE NON ROTATING PARTS
    const entryWheelOutputLetter = this.entryWheel.getLetterFromPlate(
      rightRotorBackwardsOutputPosition
    );
    const swappedOutputLetter = this.plugBoard.getSwappedLetter(
      entryWheelOutputLetter
    );

    return swappedOutputLetter;
  }

  public getEncodedLetter(inputLetter: string): string {
    if (!this.isMachineValidState()) {
      throw 'Machine is not in valid state';
    }

    this.advanceRotors();

    const leftRotorForwardOutputPosition = this.encodeForward(inputLetter);
    const reflectedPosition = this.encodeReflect(
      leftRotorForwardOutputPosition
    );
    const swappedOutputLetter = this.encodeBackwards(reflectedPosition);

    return swappedOutputLetter;
  }

  public getRotorInputPosition(inputPosition: number, rotor: string): number {
    return getModularNumber(
      inputPosition +
        getIndex(this.getRotorWindowLetter(rotor)) -
        this.getRotor(rotor).ringPosition
    );
  }

  public getRotorOutputPosition(outputPosition: number, rotor: string): number {
    return getModularNumber(
      outputPosition -
        getIndex(this.getRotorWindowLetter(rotor)) +
        this.getRotor(rotor).ringPosition
    );
  }

  public encode(string: string): string {
    let output = '';
    for (let i = 0; i < string.length; i += 1) {
      output += this.getEncodedLetter(string.charAt(i));
    }
    return output;
  }

  public isMachineValidState(): boolean {
    return (
      this.getRotor(LEFT_ROTOR) instanceof Rotor &&
      this.getRotor(CENTER_ROTOR) instanceof Rotor &&
      this.getRotor(RIGHT_ROTOR) instanceof Rotor &&
      this.reflector instanceof Reflector
    );
  }

  public static LEFT_ROTOR: string = LEFT_ROTOR;
  public static CENTER_ROTOR: string = CENTER_ROTOR;
  public static RIGHT_ROTOR: string = RIGHT_ROTOR;
}
