import { it, describe } from 'node:test';
import assert from 'node:assert';

import ReflectorB from '../enigma/Component/WiredWheel/Reflector/ReflectorB.js';
import Rotor from '../enigma/Component/WiredWheel/Rotor/Rotor.js';
import RotorI from '../enigma/Component/WiredWheel/Rotor/RotorI.js';
import RotorII from '../enigma/Component/WiredWheel/Rotor/RotorII.js';
import RotorIII from '../enigma/Component/WiredWheel/Rotor/RotorIII.js';
import Reflector from '../enigma/Component/WiredWheel/Reflector/Reflector.js';
import Enigma from '../enigma/Enigma/Enigma.js';

describe('Enigma Machine', () => {
  it('should have all its rotors not set', () => {
    const machine = new Enigma();

    assert.equal(machine.getRotor(Enigma.LEFT_ROTOR), null);
    assert.equal(machine.getRotor(Enigma.CENTER_ROTOR), null);
    assert.equal(machine.getRotor(Enigma.RIGHT_ROTOR), null);
  });

  it('should have rotor getters & setters that work', () => {
    const machine = new Enigma();

    machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

    assert.equal(machine.getRotor(Enigma.LEFT_ROTOR) instanceof Rotor, true);
    assert.equal(machine.getRotor(Enigma.CENTER_ROTOR) instanceof Rotor, true);
    assert.equal(machine.getRotor(Enigma.RIGHT_ROTOR) instanceof Rotor, true);
  });

  it('should have reflector getters & getters that work', () => {
    const machine = new Enigma();

    machine.setReflector(new ReflectorB());
    assert.equal(machine.getReflector() instanceof Reflector, true);
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

    assert.equal(machine.getRotorWindowLetter(Enigma.LEFT_ROTOR), 'K');
    assert.equal(machine.getRotorWindowLetter(Enigma.CENTER_ROTOR), 'E');
    assert.equal(machine.getRotorWindowLetter(Enigma.RIGHT_ROTOR), 'R');

    machine.advanceRotors();

    assert.equal(machine.getRotorWindowLetter(Enigma.LEFT_ROTOR), 'L');
    assert.equal(machine.getRotorWindowLetter(Enigma.CENTER_ROTOR), 'F');
    assert.equal(machine.getRotorWindowLetter(Enigma.RIGHT_ROTOR), 'S');
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
    assert.equal(test1InputPin, 0);
    const test1RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      ?.pinToPlate(test1InputPin);
    assert.notEqual(test1RealOutputPlate, undefined);
    assert.notEqual(test1RealOutputPlate, null);
    assert.equal(test1RealOutputPlate, 4);
    if (test1RealOutputPlate != null) {
      const test1AbsoluteOutputPlate = machine.getRotorOutputPosition(
        test1RealOutputPlate,
        Enigma.RIGHT_ROTOR,
      );
      assert.equal(test1AbsoluteOutputPlate, 4);
    }

    //Test 2, almost straightforward
    machine.setRotorWindowLetter('B', Enigma.RIGHT_ROTOR);
    const test2InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    assert.equal(test2InputPin, 1);
    const test2RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      ?.pinToPlate(test2InputPin);
    assert.notEqual(test2RealOutputPlate, undefined);
    assert.notEqual(test2RealOutputPlate, null);
    assert.equal(test2RealOutputPlate, 10);
    if (test2RealOutputPlate != null) {
      const test2AbsoluteOutputPlate = machine.getRotorOutputPosition(
        test2RealOutputPlate,
        Enigma.RIGHT_ROTOR,
      );
      assert.equal(test2AbsoluteOutputPlate, 9);
    }
    //Test 3, a little bit more difficult
    machine.getRotor(Enigma.RIGHT_ROTOR)?.setRingSetting('B');
    machine.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);
    const test3InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    assert.equal(test3InputPin, 25);
    const test3RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      ?.pinToPlate(test3InputPin);
    assert.notEqual(test3RealOutputPlate, undefined);
    assert.notEqual(test3RealOutputPlate, null);
    assert.equal(test3RealOutputPlate, 9);
    if (test3RealOutputPlate != null) {
      const test3AbsoluteOutputPlate = machine.getRotorOutputPosition(
        test3RealOutputPlate,
        Enigma.RIGHT_ROTOR,
      );
      assert.equal(test3AbsoluteOutputPlate, 10);
    }

    //Test 4, kind of a general case
    machine.getRotor(Enigma.RIGHT_ROTOR)?.setRingSetting('F');
    machine.setRotorWindowLetter('Y', Enigma.RIGHT_ROTOR);
    assert.equal(machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR), 19);
    const test4InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    assert.equal(test4InputPin, 19);
    const test4RealOutputPlate = machine
      .getRotor(Enigma.RIGHT_ROTOR)
      ?.pinToPlate(test4InputPin);
    assert.notEqual(test4RealOutputPlate, undefined);
    assert.notEqual(test4RealOutputPlate, null);
    assert.equal(test4RealOutputPlate, 15);
    if (test4RealOutputPlate != null) {
      const test4AbsoluteOutputPlate = machine.getRotorOutputPosition(
        test4RealOutputPlate,
        Enigma.RIGHT_ROTOR,
      );
      assert.equal(test4AbsoluteOutputPlate, 22);
    }
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

    assert.equal(machine.getEncodedLetter('A'), 'B');
    assert.equal(machine.getEncodedLetter('A'), 'D');
    assert.equal(machine.getEncodedLetter('A'), 'Z');
    assert.equal(machine.getEncodedLetter('A'), 'G');
    assert.equal(machine.getEncodedLetter('A'), 'O');
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

    assert.equal(machine.getEncodedLetter('A'), 'E');
    assert.equal(machine.getEncodedLetter('A'), 'W');
    assert.equal(machine.getEncodedLetter('A'), 'T');
    assert.equal(machine.getEncodedLetter('A'), 'Y');
    assert.equal(machine.getEncodedLetter('A'), 'X');
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

    assert.equal(machine.getEncodedLetter(encodedLetter), 'A');
  });
});
