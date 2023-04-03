import { Enigma as IndexEnigma } from '../src/index';
import Enigma from '../src/Enigma/Enigma';

describe('indexjs', () => {
  it('should load the same things', () => {
    expect(IndexEnigma).toBe(Enigma);
  });
});
