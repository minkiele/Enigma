var RotorI = require('../dist/Component/WiredWheel/Rotor/RotorI');

describe('RotorI', function () {
  it('should return the same position', function () {
    var rotorI = new RotorI();
    for(var i = 0; i < 26; i += 1) {
      expect(rotorI.plateToPin(rotorI.pinToPlate(i))).toBe(i);
    }
  });
});
