var RotorI = require('../dist/Component/WiredWheel/Rotor/RotorI').default;

describe('RotorI', function () {
  it('should return the same position', function () {
    var rotorI = new RotorI();
    for(var i = 0; i < 26; i += 1) {
      expect(rotorI.getInputPin(rotorI.getOutputPlate(i))).toBe(i);
    }
  });
});
