import RotorI from '../enigma/Component/WiredWheel/Rotor/RotorI.js.js';

describe('RotorI', () => {
  it('should return the same position', () => {
    const rotorI = new RotorI();
    for (let i = 0; i < 26; i += 1) {
      expect(rotorI.plateToPin(rotorI.pinToPlate(i))).toBe(i);
    }
  });
});
