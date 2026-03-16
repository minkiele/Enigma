import { describe, it } from 'node:test';
import assert from 'node:assert';

import { Enigma as IndexEnigma } from '../enigma/index.js';
import Enigma from '../enigma/Enigma/Enigma.js';

describe('indexjs', () => {
  it('should load the same thing', () => {
    assert.equal(IndexEnigma, Enigma);
  });
});
