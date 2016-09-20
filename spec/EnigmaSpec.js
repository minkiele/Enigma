var Enigma = require('../dist/Enigma');
var Rotor = require('../dist/Component/WiredWheel/Rotor/Rotor').default;
var RotorI = require('../dist/Component/WiredWheel/Rotor/RotorI').default;
var RotorII = require('../dist/Component/WiredWheel/Rotor/RotorII').default;
var RotorIII = require('../dist/Component/WiredWheel/Rotor/RotorIII').default;

describe('Enigma Machine', function () {

  it('should have all its rotors not set', function () {

    var machine = new Enigma.default();

    expect(machine.getRotor(Enigma.LEFT_ROTOR)).toBe(null);
    expect(machine.getRotor(Enigma.CENTER_ROTOR)).toBe(null);
    expect(machine.getRotor(Enigma.RIGHT_ROTOR)).toBe(null);
  });

  it('should have rotor setters that work', function () {

      var machine = new Enigma.default();

      machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
      machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
      machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

      expect(machine.rotors[Enigma.LEFT_ROTOR]).toEqual(jasmine.any(Rotor));
      expect(machine.rotors[Enigma.CENTER_ROTOR]).toEqual(jasmine.any(Rotor));
      expect(machine.rotors[Enigma.RIGHT_ROTOR]).toEqual(jasmine.any(Rotor));

  });

  it('should have rotor getters that work', function () {

      var machine = new Enigma.default();

      machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
      machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
      machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

      expect(machine.getRotor(Enigma.LEFT_ROTOR)).toEqual(jasmine.any(Rotor));
      expect(machine.getRotor(Enigma.CENTER_ROTOR)).toEqual(jasmine.any(Rotor));
      expect(machine.getRotor(Enigma.RIGHT_ROTOR)).toEqual(jasmine.any(Rotor));

  });

  it('should do the double step', function () {

      var machine = new Enigma.default();

      machine.setRotor(new RotorIII(), Enigma.LEFT_ROTOR);
      machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
      machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);

      machine.setRotorWindowLetter('K', Enigma.LEFT_ROTOR);
      machine.setRotorWindowLetter('D', Enigma.CENTER_ROTOR);
      machine.setRotorWindowLetter('Q', Enigma.RIGHT_ROTOR);

      machine.advanceRotors();

      expect(machine.getRotorWindowLetter(Enigma.LEFT_ROTOR)).toEqual('K');
      expect(machine.getRotorWindowLetter(Enigma.CENTER_ROTOR)).toEqual('E');
      expect(machine.getRotorWindowLetter(Enigma.RIGHT_ROTOR)).toEqual('R');

      machine.advanceRotors();

      expect(machine.getRotorWindowLetter(Enigma.LEFT_ROTOR)).toEqual('L');
      expect(machine.getRotorWindowLetter(Enigma.CENTER_ROTOR)).toEqual('F');
      expect(machine.getRotorWindowLetter(Enigma.RIGHT_ROTOR)).toEqual('S');

  });

});
