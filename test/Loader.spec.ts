import { Enigma as IndexEnigma } from '../src/index';
import Enigma from '../src/Enigma';

describe('indexjs', () => {
  it('should load the same things', () => {
    expect(IndexEnigma).toBe(Enigma);
  });
});
