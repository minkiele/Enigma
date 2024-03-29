import Uhr from '../src/Component/PlugBoard/Uhr';
import ReflectorB from '../src/Component/WiredWheel/Reflector/ReflectorB';
import RotorI from '../src/Component/WiredWheel/Rotor/RotorI';
import RotorII from '../src/Component/WiredWheel/Rotor/RotorII';
import RotorIII from '../src/Component/WiredWheel/Rotor/RotorIII';
import RotorVI from '../src/Component/WiredWheel/Rotor/RotorVI';
import RotorVIII from '../src/Component/WiredWheel/Rotor/RotorVIII';
import Enigma from '../src/Enigma/Enigma';
import { getLetter } from '../src/lib/utils';

const letterPairs = Array.from({ length: 10 }).map(
  (_, index) =>
    [getLetter(index * 2), getLetter(index * 2 + 1)] as [string, string]
);

describe('Uhr', () => {
  it('Should validate position 0 is compatibility mode', () => {
    const uhr = new Uhr();
    uhr.prepareUhrWires(letterPairs);
    for (let i = 1; i <= 10; i += 1) {
      const wire = uhr.getUhrWire(i);
      expect(wire.swapForward(wire.firstLetter)).toBe(wire.secondLetter);
      expect(wire.swapForward(wire.secondLetter)).toBe(wire.firstLetter);
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

    expect(wire1.swapForward(wire1.firstLetter)).toBe(wire5.secondLetter);
    expect(wire1.swapForward(wire1.secondLetter)).toBe(wire6.firstLetter);

    expect(wire2.swapForward(wire2.firstLetter)).toBe(wire9.secondLetter);
    expect(wire2.swapForward(wire2.secondLetter)).toBe(wire8.firstLetter);

    expect(wire3.swapForward(wire3.firstLetter)).toBe(wire4.secondLetter);
    expect(wire3.swapForward(wire3.secondLetter)).toBe(wire10.firstLetter);

    expect(wire4.swapForward(wire4.firstLetter)).toBe(wire10.secondLetter);
    expect(wire4.swapForward(wire4.secondLetter)).toBe(wire1.firstLetter);

    expect(wire5.swapForward(wire5.firstLetter)).toBe(wire2.secondLetter);
    expect(wire5.swapForward(wire5.secondLetter)).toBe(wire4.firstLetter);

    expect(wire6.swapForward(wire6.firstLetter)).toBe(wire6.secondLetter);
    expect(wire6.swapForward(wire6.secondLetter)).toBe(wire9.firstLetter);

    expect(wire7.swapForward(wire7.firstLetter)).toBe(wire3.secondLetter);
    expect(wire7.swapForward(wire7.secondLetter)).toBe(wire5.firstLetter);

    expect(wire8.swapForward(wire8.firstLetter)).toBe(wire7.secondLetter);
    expect(wire8.swapForward(wire8.secondLetter)).toBe(wire3.firstLetter);

    expect(wire9.swapForward(wire9.firstLetter)).toBe(wire8.secondLetter);
    expect(wire9.swapForward(wire9.secondLetter)).toBe(wire2.firstLetter);

    expect(wire10.swapForward(wire10.firstLetter)).toBe(wire1.secondLetter);
    expect(wire10.swapForward(wire10.secondLetter)).toBe(wire7.firstLetter);
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
    expect(reencodedMessage).toBe(encodedMessage);
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
      expect(encodedMessage).not.toBe(plainMessage);
      m3.setRotorWindowLetter('A', Enigma.LEFT_ROTOR);
      m3.setRotorWindowLetter('A', Enigma.CENTER_ROTOR);
      m3.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);
      const decodedMessage = m3.encode(encodedMessage);
      expect(decodedMessage).toBe(plainMessage);
    }
  });
});
