import RotorI from '../src/Component/WiredWheel/Rotor/RotorI';

describe('RotorI', () => {
  it('should return the same position', () => {
    const rotorI = new RotorI();
    for (let i = 0; i < 26; i += 1) {
      expect(rotorI.plateToPin(rotorI.pinToPlate(i))).toBe(i);
    }
  });
});
