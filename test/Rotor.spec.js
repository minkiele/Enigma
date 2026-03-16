import { describe, it } from 'node:test';
import assert from 'node:assert';

import RotorI from '../enigma/Component/WiredWheel/Rotor/RotorI.js';

describe('RotorI', () => {
  it('should return the same position', () => {
    const rotorI = new RotorI();
    for (let i = 0; i < 26; i += 1) {
      assert.equal(rotorI.plateToPin(rotorI.pinToPlate(i)), i);
    }
  });
});
