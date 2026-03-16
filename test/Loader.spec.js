import { Enigma as IndexEnigma } from '../enigma/index.js';
import Enigma from '../enigma/Enigma/Enigma.js';

describe('indexjs', () => {
  it('should load the same things', () => {
    expect(IndexEnigma).toBe(Enigma);
  });
});
