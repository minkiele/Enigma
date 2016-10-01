var Enigma = require('../dist/Enigma');
var EnigmaM4 = require('../dist/EnigmaM4');
var RotorI = require('../dist/Component/WiredWheel/Rotor/RotorI');
var RotorII = require('../dist/Component/WiredWheel/Rotor/RotorII');
var RotorIII = require('../dist/Component/WiredWheel/Rotor/RotorIII');
var RotorIV = require('../dist/Component/WiredWheel/Rotor/RotorIV');
var ThinRotorBeta = require('../dist/Component/WiredWheel/Rotor/ThinRotor/ThinRotorBeta');
var ThinReflectorB = require('../dist/Component/WiredWheel/Reflector/ThinReflector/ThinReflectorB');
var ReflectorB = require('../dist/Component/WiredWheel/Reflector/ReflectorB');

describe('EnigmaM4 Machine', function () {

  it('should decrypt correctly this message', function () {
    /**
     * Test found here
     * @link http://wiki.franklinheath.co.uk/index.php/Enigma/Sample_Messages
     */

    var machine = new EnigmaM4();

    machine.setReflector(new ThinReflectorB());

    var fourthRotor = new ThinRotorBeta();
    machine.setRotor(fourthRotor, EnigmaM4.FOURTH_ROTOR);

    var leftRotor = new RotorII();
    machine.setRotor(leftRotor, EnigmaM4.LEFT_ROTOR);

    var centerRotor = new RotorIV();
    machine.setRotor(centerRotor, EnigmaM4.CENTER_ROTOR);

    var rightRotor = new RotorI();
    rightRotor.setRingPosition(21);
    machine.setRotor(rightRotor, EnigmaM4.RIGHT_ROTOR);

    var plugBoard = machine.getPlugBoard();

    plugBoard.plugWire('A', 'T');
    plugBoard.plugWire('B', 'L');
    plugBoard.plugWire('D', 'F');
    plugBoard.plugWire('G', 'J');
    plugBoard.plugWire('H', 'M');
    plugBoard.plugWire('N', 'W');
    plugBoard.plugWire('O', 'P');
    plugBoard.plugWire('Q', 'Y');
    plugBoard.plugWire('R', 'Z');
    plugBoard.plugWire('V', 'X');

    machine.setRotorWindowLetter('V', EnigmaM4.FOURTH_ROTOR);
    machine.setRotorWindowLetter('J', EnigmaM4.LEFT_ROTOR);
    machine.setRotorWindowLetter('N', EnigmaM4.CENTER_ROTOR);

    var encodedMessage = 'NCZWVUSXPNYMINHZXMQXSFWXWLKJAHSHNMCOCCAKUQPMKCSMHKSEINJUSBLKIOSXCKUBHMLLXCSJUSRRDVKOHULXWCCBGVLIYXEOAHXRHKKFVDREWEZLXOBAFGYUJQUKGRTVUKAMEURBVEKSUHHVOYHABCJWMAKLFKLMYFVNRIZRVVRTKOFDANJMOLBGFFLEOPRGTFLVRHOWOPBEKVWMUQFMPWPARMFHAGKXIIBG';
                        //VONVONJLOOKSJHFFTTTEINSEINSDREIZWOYYQNNSNEUNINHALTXXBEIANGRIFFUNTERWASSERGEDRUECKTYWABOSXLETZTERGEGNERSTANDNULACHTDREINULUHRMARQUANTONJOTANEUNACHTSEYHSDREIYZWOZWONULGRADYACHTSMYSTOSSENACHXEKNSVIERMBFAELLTYNNNNNNOOOVIERYSICHTEINSNULL
    var decodedMessage = machine.encode(encodedMessage);

    machine.setRotorWindowLetter('V', EnigmaM4.FOURTH_ROTOR);
    machine.setRotorWindowLetter('J', EnigmaM4.LEFT_ROTOR);
    machine.setRotorWindowLetter('N', EnigmaM4.CENTER_ROTOR);
    machine.setRotorWindowLetter('A', EnigmaM4.RIGHT_ROTOR);

    expect(machine.encode(decodedMessage)).toBe(encodedMessage);
  });

});

describe('Enigma M4 Machine (in classic mode)', function () {
  it('should encode AAAAA IN BDZGO', function () {

    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    var machine = new EnigmaM4();

    machine.setRotor(new RotorI(), EnigmaM4.LEFT_ROTOR);
    machine.setRotor(new RotorII(), EnigmaM4.CENTER_ROTOR);
    machine.setRotor(new RotorIII(), EnigmaM4.RIGHT_ROTOR);
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

    var machine = new EnigmaM4();

    var leftRotor = new RotorI();
    leftRotor.setRingSetting('B');
    var centerRotor = new RotorII();
    centerRotor.setRingSetting('B');
    var rightRotor = new RotorIII();
    rightRotor.setRingSetting('B');

    machine.setRotor(leftRotor, EnigmaM4.LEFT_ROTOR);
    machine.setRotor(centerRotor, EnigmaM4.CENTER_ROTOR);
    machine.setRotor(rightRotor, EnigmaM4.RIGHT_ROTOR);
    machine.setReflector(new ReflectorB());

    expect(machine.getEncodedLetter('A')).toEqual('E');
    expect(machine.getEncodedLetter('A')).toEqual('W');
    expect(machine.getEncodedLetter('A')).toEqual('T');
    expect(machine.getEncodedLetter('A')).toEqual('Y');
    expect(machine.getEncodedLetter('A')).toEqual('X');

  });
});
