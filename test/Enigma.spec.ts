import ReflectorB from '../src/Component/WiredWheel/Reflector/ReflectorB';
import Rotor from '../src/Component/WiredWheel/Rotor/Rotor';
import RotorI from '../src/Component/WiredWheel/Rotor/RotorI';
import RotorII from '../src/Component/WiredWheel/Rotor/RotorII';
import RotorIII from '../src/Component/WiredWheel/Rotor/RotorIII';
import Enigma from '../src/Enigma/Enigma';

describe('Enigma Machine', () => {
  it('should have all its rotors not set', () => {
    const machine = new Enigma();

    expect(machine.getRotor(Enigma.LEFT_ROTOR)).toBe(null);
    expect(machine.getRotor(Enigma.CENTER_ROTOR)).toBe(null);
    expect(machine.getRotor(Enigma.RIGHT_ROTOR)).toBe(null);
  });

  it('should have rotor setters that work', () => {
    const machine = new Enigma();

    machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

    expect(machine.getRotor(Enigma.LEFT_ROTOR)).toEqual(expect.any(Rotor));
    expect(machine.getRotor(Enigma.CENTER_ROTOR)).toEqual(expect.any(Rotor));
    expect(machine.getRotor(Enigma.RIGHT_ROTOR)).toEqual(expect.any(Rotor));
  });

  it('should have rotor getters that work', () => {
    const machine = new Enigma();

    machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

    expect(machine.getRotor(Enigma.LEFT_ROTOR)).toEqual(expect.any(Rotor));
    expect(machine.getRotor(Enigma.CENTER_ROTOR)).toEqual(expect.any(Rotor));
    expect(machine.getRotor(Enigma.RIGHT_ROTOR)).toEqual(expect.any(Rotor));
  });

  it('should do the double step', () => {
    const machine = new Enigma();

    machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

    machine.setRotorWindowLetter('K', Enigma.LEFT_ROTOR);
    machine.setRotorWindowLetter('D', Enigma.CENTER_ROTOR);
    machine.setRotorWindowLetter('Q', Enigma.RIGHT_ROTOR);

    machine.advanceRotors();

    expect(machine.getRotorWindowLetter(Enigma.LEFT_ROTOR)).toEqual('K');
    expect(machine.getRotorWindowLetter(Enigma.CENTER_ROTOR)).toEqual('E');
    expect(machine.getRotorWindowLetter(Enigma.RIGHT_ROTOR)).toEqual('R');

    machine.advanceRotors();

    expect(machine.getRotorWindowLetter(Enigma.LEFT_ROTOR)).toEqual('L');
    expect(machine.getRotorWindowLetter(Enigma.CENTER_ROTOR)).toEqual('F');
    expect(machine.getRotorWindowLetter(Enigma.RIGHT_ROTOR)).toEqual('S');
  });

  it('should find the correct input pin and output plate', () => {
    const machine = new Enigma();

    /**
     * Verifying this tests
     * http://users.telenet.be/d.rijmenants/en/enigmatech.htm#steppingmechanism
     */
    //Test 1, straightforward
    machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);
    const test1InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test1InputPin).toEqual(0);
    const test1RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      .pinToPlate(test1InputPin);
    expect(test1RealOutputPlate).toEqual(4);
    const test1AbsoluteOutputPlate = machine.getRotorOutputPosition(
      test1RealOutputPlate,
      Enigma.RIGHT_ROTOR
    );
    expect(test1AbsoluteOutputPlate).toEqual(4);

    //Test 2, almost straightforward
    machine.setRotorWindowLetter('B', Enigma.RIGHT_ROTOR);
    const test2InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test2InputPin).toEqual(1);
    const test2RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      .pinToPlate(test2InputPin);
    expect(test2RealOutputPlate).toEqual(10);
    const test2AbsoluteOutputPlate = machine.getRotorOutputPosition(
      test2RealOutputPlate,
      Enigma.RIGHT_ROTOR
    );
    expect(test2AbsoluteOutputPlate).toEqual(9);

    //Test 3, a little bit more difficult
    machine.getRotor(Enigma.RIGHT_ROTOR).setRingSetting('B');
    machine.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);
    const test3InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test3InputPin).toEqual(25);
    const test3RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      .pinToPlate(test3InputPin);
    expect(test3RealOutputPlate).toEqual(9);
    const test3AbsoluteOutputPlate = machine.getRotorOutputPosition(
      test3RealOutputPlate,
      Enigma.RIGHT_ROTOR
    );
    expect(test3AbsoluteOutputPlate).toEqual(10);

    //Test 4, kind of a general case
    machine.getRotor(Enigma.RIGHT_ROTOR).setRingSetting('F');
    machine.setRotorWindowLetter('Y', Enigma.RIGHT_ROTOR);
    expect(machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR)).toEqual(19);
    const test4InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test4InputPin).toEqual(19);
    const test4RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      .pinToPlate(test4InputPin);
    expect(test4RealOutputPlate).toEqual(15);
    const test4AbsoluteOutputPlate = machine.getRotorOutputPosition(
      test4RealOutputPlate,
      Enigma.RIGHT_ROTOR
    );
    expect(test4AbsoluteOutputPlate).toEqual(22);
  });

  it('should encode AAAAA IN BDZGO', () => {
    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    const machine = new Enigma();

    machine.setRotor(new RotorI(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorIII(), Enigma.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    expect(machine.getEncodedLetter('A')).toEqual('B');
    expect(machine.getEncodedLetter('A')).toEqual('D');
    expect(machine.getEncodedLetter('A')).toEqual('Z');
    expect(machine.getEncodedLetter('A')).toEqual('G');
    expect(machine.getEncodedLetter('A')).toEqual('O');
  });

  it('should encode AAAAA IN EWTYX', () => {
    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    const machine = new Enigma();

    const leftRotor = new RotorI();
    leftRotor.setRingSetting('B');
    const centerRotor = new RotorII();
    centerRotor.setRingSetting('B');
    const rightRotor = new RotorIII();
    rightRotor.setRingSetting('B');

    machine.setRotor(leftRotor, Enigma.LEFT_ROTOR);
    machine.setRotor(centerRotor, Enigma.CENTER_ROTOR);
    machine.setRotor(rightRotor, Enigma.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    expect(machine.getEncodedLetter('A')).toEqual('E');
    expect(machine.getEncodedLetter('A')).toEqual('W');
    expect(machine.getEncodedLetter('A')).toEqual('T');
    expect(machine.getEncodedLetter('A')).toEqual('Y');
    expect(machine.getEncodedLetter('A')).toEqual('X');
  });

  it('should encode both ways', () => {
    const machine = new Enigma();

    machine.setRotor(new RotorI(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorIII(), Enigma.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    const encodedLetter = machine.getEncodedLetter('A');

    machine.setRotorWindowLetter('A', Enigma.LEFT_ROTOR);
    machine.setRotorWindowLetter('A', Enigma.CENTER_ROTOR);
    machine.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);

    expect(machine.getEncodedLetter(encodedLetter)).toEqual('A');
  });
});
