var Enigma = require('../dist/Enigma');
var Rotor = require('../dist/Component/WiredWheel/Rotor/Rotor').default;
var RotorI = require('../dist/Component/WiredWheel/Rotor/RotorI').default;
var RotorII = require('../dist/Component/WiredWheel/Rotor/RotorII').default;
var RotorIII = require('../dist/Component/WiredWheel/Rotor/RotorIII').default;
var ReflectorB = require('../dist/Component/WiredWheel/Reflector/ReflectorB').default;

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

  it('should find the correct input pin and output plate', function () {

    var machine = new Enigma.default();

    /**
     * Verifying this tests
     * http://users.telenet.be/d.rijmenants/en/enigmatech.htm#steppingmechanism
     */
    //Test 1, straightforward
    machine.setRotor(new RotorI(), Enigma.RIGHT_ROTOR);
    var test1InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test1InputPin).toEqual(0);
    var test1RealOutputPlate = machine.getRotor(Enigma.RIGHT_ROTOR).pinToPlate(test1InputPin);
    expect(test1RealOutputPlate).toEqual(4);
    var test1AbsoluteOutputPlate = machine.getRotorOutputPosition(test1RealOutputPlate, Enigma.RIGHT_ROTOR);
    expect(test1AbsoluteOutputPlate).toEqual(4);

    //Test 2, almost straightforward
    machine.setRotorWindowLetter('B', Enigma.RIGHT_ROTOR);
    var test2InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test2InputPin).toEqual(1);
    var test2RealOutputPlate = machine.getRotor(Enigma.RIGHT_ROTOR).pinToPlate(test2InputPin);
    expect(test2RealOutputPlate).toEqual(10);
    var test2AbsoluteOutputPlate = machine.getRotorOutputPosition(test2RealOutputPlate, Enigma.RIGHT_ROTOR);
    expect(test2AbsoluteOutputPlate).toEqual(9);


    //Test 3, a little bit more difficult
    machine.getRotor(Enigma.RIGHT_ROTOR).setRingSetting('B');
    machine.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);
    var test3InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test3InputPin).toEqual(25);
    var test3RealOutputPlate = machine.getRotor(Enigma.RIGHT_ROTOR).pinToPlate(test3InputPin);
    expect(test3RealOutputPlate).toEqual(9);
    var test3AbsoluteOutputPlate = machine.getRotorOutputPosition(test3RealOutputPlate, Enigma.RIGHT_ROTOR);
    expect(test3AbsoluteOutputPlate).toEqual(10);

    //Test 4, kind of a general case
    machine.getRotor(Enigma.RIGHT_ROTOR).setRingSetting('F');
    machine.setRotorWindowLetter('Y', Enigma.RIGHT_ROTOR);
    expect(machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR)).toEqual(19);
    var test4InputPin = machine.getRotorInputPosition(0, Enigma.RIGHT_ROTOR);
    expect(test4InputPin).toEqual(19);
    var test4RealOutputPlate = machine.getRotor(Enigma.RIGHT_ROTOR).pinToPlate(test4InputPin);
    expect(test4RealOutputPlate).toEqual(15);
    var test4AbsoluteOutputPlate = machine.getRotorOutputPosition(test4RealOutputPlate, Enigma.RIGHT_ROTOR);
    expect(test4AbsoluteOutputPlate).toEqual(22);

  });

  it('should encode AAAAA IN BDZGO', function () {

    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    var machine = new Enigma.default();

    machine.setRotor(new RotorI(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorIII(), Enigma.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    expect(machine.getEncodedLetter('A')).toEqual('B');
    expect(machine.getEncodedLetter('A')).toEqual('D');
    expect(machine.getEncodedLetter('A')).toEqual('Z');
    expect(machine.getEncodedLetter('A')).toEqual('G');
    expect(machine.getEncodedLetter('A')).toEqual('O');

  });


  it('should encode AAAAA IN EWTYX', function () {

    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    var machine = new Enigma.default();

    var leftRotor = new RotorI();
    leftRotor.setRingSetting('B');
    var centerRotor = new RotorII();
    centerRotor.setRingSetting('B');
    var rightRotor = new RotorIII();
    rightRotor.setRingSetting('B');

    machine.setRotor(leftRotor, Enigma.LEFT_ROTOR);
    machine.setRotor(centerRotor, Enigma.CENTER_ROTOR);
    machine.setRotor(rightRotor, Enigma.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    expect(machine.getEncodedLetter('A')).toEqual('E');
    expect(machine.getEncodedLetter('A')).toEqual('W');
    expect(machine.getEncodedLetter('A')).toEqual('T');
    expect(machine.getEncodedLetter('A')).toEqual('Y');
    expect(machine.getEncodedLetter('A')).toEqual('X');

  });

  it('should encode both ways', function () {

    var machine = new Enigma.default();

    machine.setRotor(new RotorI(), Enigma.LEFT_ROTOR);
    machine.setRotor(new RotorII(), Enigma.CENTER_ROTOR);
    machine.setRotor(new RotorIII(), Enigma.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    var encodedLetter = machine.getEncodedLetter('A');

    machine.setRotorWindowLetter('A', Enigma.LEFT_ROTOR);
    machine.setRotorWindowLetter('A', Enigma.CENTER_ROTOR);
    machine.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);

    expect(machine.getEncodedLetter(encodedLetter)).toEqual('A');

  });

});
