describe('indexjs', function () {
  it('should load the same things', function () {
    var enigma = require('..');
    var Enigma = require('../dist/Enigma');
    expect(enigma.Enigma).toBe(Enigma);
  });
});
