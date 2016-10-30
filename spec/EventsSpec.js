var Enigma = require('..');

describe('Plugboard EventEmitter', function () {

  var plugBoard = new Enigma.PlugBoard();

  it('should emit change.wirePlugged event', function (done) {

    plugBoard.on('change.wirePlugged', function(firstLetter, secondLetter) {
      expect(firstLetter).toBe('A');
      expect(secondLetter).toBe('B');
      done();
    });

    plugBoard.plugWire('A', 'B');

  }, 200);

  it('should emit change.wireUnplugged event', function (done) {

    plugBoard.on('change.wireUnplugged', function(firstLetter, secondLetter) {
      expect(firstLetter).toBe('A');
      expect(secondLetter).toBe('B');
      done();
    });

    plugBoard.unplugWire('A', 'B');

  }, 200);

});


describe('Rotor EventEmitter', function () {

  var rotor = new Enigma.RotorI();

  it('should emit change.ringPositionSet event', function (done) {

    rotor.on('change.ringPositionSet', function(position) {
      expect(position).toBe(1);
      done();
    });

    rotor.setRingSetting('B');

  }, 200);

  it('should emit change.ringSettingSet event', function (done) {

    rotor.on('change.ringSettingSet', function(letter) {
      expect(letter).toBe('B');
      done();
    });

    rotor.setRingSetting('B');

  }, 200);

});
