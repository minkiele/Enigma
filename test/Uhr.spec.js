import { describe, it } from 'node:test';
import assert from 'node:assert';

import Uhr from '../enigma/Component/PlugBoard/Uhr.js';
import ReflectorB from '../enigma/Component/WiredWheel/Reflector/ReflectorB.js';
import RotorI from '../enigma/Component/WiredWheel/Rotor/RotorI.js';
import RotorII from '../enigma/Component/WiredWheel/Rotor/RotorII.js';
import RotorIII from '../enigma/Component/WiredWheel/Rotor/RotorIII.js';
import RotorVI from '../enigma/Component/WiredWheel/Rotor/RotorVI.js';
import RotorVIII from '../enigma/Component/WiredWheel/Rotor/RotorVIII.js';
import Enigma from '../enigma/Enigma/Enigma.js';
import { getLetter } from '../enigma/lib/utils.js';

const letterPairs = Array.from({ length: 10 }).map(
  (_, index) =>
    [getLetter(index * 2), getLetter(index * 2 + 1)]
);

describe('Uhr', () => {
  it('Should validate position 0 is compatibility mode', () => {
    const uhr = new Uhr();
    uhr.prepareUhrWires(letterPairs);
    for (let i = 1; i <= 10; i += 1) {
      const wire = uhr.getUhrWire(i);
      assert.equal(wire.swapForward(wire.firstLetter), wire.secondLetter);
      assert.equal(wire.swapForward(wire.secondLetter), wire.firstLetter);
    }
  });
  it('Should confirm non-reciprocity on other settings', () => {
    const uhr = new Uhr();
    uhr.setUhrSetting(3);
    uhr.prepareUhrWires(letterPairs);
    const wire1 = uhr.getUhrWire(1);
    const wire2 = uhr.getUhrWire(2);
    const wire3 = uhr.getUhrWire(3);
    const wire4 = uhr.getUhrWire(4);
    const wire5 = uhr.getUhrWire(5);
    const wire6 = uhr.getUhrWire(6);
    const wire7 = uhr.getUhrWire(7);
    const wire8 = uhr.getUhrWire(8);
    const wire9 = uhr.getUhrWire(9);
    const wire10 = uhr.getUhrWire(10);

    assert.equal(wire1.swapForward(wire1.firstLetter), wire5.secondLetter);
    assert.equal(wire1.swapForward(wire1.secondLetter), wire6.firstLetter);

    assert.equal(wire2.swapForward(wire2.firstLetter), wire9.secondLetter);
    assert.equal(wire2.swapForward(wire2.secondLetter), wire8.firstLetter);

    assert.equal(wire3.swapForward(wire3.firstLetter), wire4.secondLetter);
    assert.equal(wire3.swapForward(wire3.secondLetter), wire10.firstLetter);

    assert.equal(wire4.swapForward(wire4.firstLetter), wire10.secondLetter);
    assert.equal(wire4.swapForward(wire4.secondLetter), wire1.firstLetter);

    assert.equal(wire5.swapForward(wire5.firstLetter), wire2.secondLetter);
    assert.equal(wire5.swapForward(wire5.secondLetter), wire4.firstLetter);

    assert.equal(wire6.swapForward(wire6.firstLetter), wire6.secondLetter);
    assert.equal(wire6.swapForward(wire6.secondLetter), wire9.firstLetter);

    assert.equal(wire7.swapForward(wire7.firstLetter), wire3.secondLetter);
    assert.equal(wire7.swapForward(wire7.secondLetter), wire5.firstLetter);

    assert.equal(wire8.swapForward(wire8.firstLetter), wire7.secondLetter);
    assert.equal(wire8.swapForward(wire8.secondLetter), wire3.firstLetter);

    assert.equal(wire9.swapForward(wire9.firstLetter), wire8.secondLetter);
    assert.equal(wire9.swapForward(wire9.secondLetter), wire2.firstLetter);

    assert.equal(wire10.swapForward(wire10.firstLetter), wire1.secondLetter);
    assert.equal(wire10.swapForward(wire10.secondLetter), wire7.firstLetter);
  });

  it('Should decode a M3 message when in position 0', () => {
    const m3 = new Enigma();
    m3.setReflector(new ReflectorB());
    const lr = new RotorIII();
    // lr.setRingPosition(1);
    m3.setRotor(lr, Enigma.LEFT_ROTOR);
    const cr = new RotorVI();
    cr.setRingPosition(7);
    m3.setRotor(cr, Enigma.CENTER_ROTOR);
    const rr = new RotorVIII();
    rr.setRingPosition(12);
    m3.setRotor(rr, Enigma.RIGHT_ROTOR);
    m3.setRotorWindowLetter('U', Enigma.LEFT_ROTOR);
    m3.setRotorWindowLetter('Z', Enigma.CENTER_ROTOR);
    m3.setRotorWindowLetter('V', Enigma.RIGHT_ROTOR);
    const uhr = new Uhr();
    uhr.prepareUhrWires([
      ['A', 'N'],
      ['E', 'Z'],
      ['H', 'K'],
      ['I', 'J'],
      ['L', 'R'],
      ['M', 'Q'],
      ['O', 'T'],
      ['P', 'V'],
      ['S', 'W'],
      ['U', 'X'],
    ]);
    m3.getPlugBoard().plugWires(uhr.getUhrWires());
    const encodedMessage =
      'YKAENZAPMSCHZBFOCUVMRMDPYCOFHADZIZMEFXTHFLOLPZLFGGBOTGOXGRETDWTJIQHLMXVJWKZUASTR';
    // STEUEREJTANAFJORDJANSTANDORTQUAAACCCVIERNEUNNEUNZWOFAHRTZWONULSMXXSCHARNHORSTHCO
    const decodedMessage = m3.encode(encodedMessage);

    m3.setRotorWindowLetter('U', Enigma.LEFT_ROTOR);
    m3.setRotorWindowLetter('Z', Enigma.CENTER_ROTOR);
    m3.setRotorWindowLetter('V', Enigma.RIGHT_ROTOR);

    const reencodedMessage = m3.encode(decodedMessage);
    assert.equal(reencodedMessage, encodedMessage);
  });

  it('Should encode and decode a message when in position different than 0', () => {
    const m3 = new Enigma();
    m3.setReflector(new ReflectorB());
    m3.setRotor(new RotorI(), Enigma.LEFT_ROTOR);
    m3.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    m3.setRotor(new RotorIII(), Enigma.RIGHT_ROTOR);
    const uhr = new Uhr();
    uhr.prepareUhrWires(letterPairs);
    m3.getPlugBoard().plugWires(uhr.getUhrWires());
    const plainMessage = 'AAAAA';

    for (let i = 1; i < 40; i += 1) {
      uhr.setUhrSetting(i);
      m3.setRotorWindowLetter('A', Enigma.LEFT_ROTOR);
      m3.setRotorWindowLetter('A', Enigma.CENTER_ROTOR);
      m3.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);
      const encodedMessage = m3.encode(plainMessage);
      assert.notEqual(encodedMessage, plainMessage);
      m3.setRotorWindowLetter('A', Enigma.LEFT_ROTOR);
      m3.setRotorWindowLetter('A', Enigma.CENTER_ROTOR);
      m3.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);
      const decodedMessage = m3.encode(encodedMessage);
      assert.equal(decodedMessage, plainMessage);
    }
  });
});
