import PlugBoard from '../src/Component/PlugBoard/PlugBoard';
import RotorI from '../src/Component/WiredWheel/Rotor/RotorI';

describe('Plugboard EventEmitter', () => {
  const plugBoard = new PlugBoard();

  it('should emit change.wirePlugged event', (done) => {
    plugBoard.on('change.wirePlugged', (firstLetter, secondLetter) => {
      expect(firstLetter).toBe('A');
      expect(secondLetter).toBe('B');
      done();
    });

    plugBoard.plugWire('A', 'B');
  }, 200);

  it('should emit change.wireUnplugged event', (done) => {
    plugBoard.on('change.wireUnplugged', (firstLetter, secondLetter) => {
      expect(firstLetter).toBe('A');
      expect(secondLetter).toBe('B');
      done();
    });

    plugBoard.unplugWire('A', 'B');
  }, 200);
});

describe('Rotor EventEmitter', () => {
  const rotor = new RotorI();

  it('should emit change.ringPositionSet event', (done) => {
    rotor.on('change.ringPositionSet', (position) => {
      expect(position).toBe(1);
      done();
    });

    rotor.setRingSetting('B');
  }, 200);

  it('should emit change.ringSettingSet event', (done) => {
    rotor.on('change.ringSettingSet', (letter) => {
      expect(letter).toBe('B');
      done();
    });

    rotor.setRingSetting('B');
  }, 200);
});
