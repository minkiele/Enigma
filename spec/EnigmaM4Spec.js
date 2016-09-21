var Enigma = require('../dist/Enigma');
var EnigmaM4 = require('../dist/EnigmaM4');
var RotorI = require('../dist/Component/WiredWheel/Rotor/RotorI');
var RotorII = require('../dist/Component/WiredWheel/Rotor/RotorII');
var RotorIV = require('../dist/Component/WiredWheel/Rotor/RotorIV');
var RotorIV = require('../dist/Component/WiredWheel/Rotor/RotorIV');
var ThinRotorBeta = require('../dist/Component/WiredWheel/Rotor/ThinRotor/ThinRotorBeta');
var ThinReflectorB = require('../dist/Component/WiredWheel/Reflector/ThinReflector/ThinReflectorB');

describe('EnigmaM4 Machine', function () {

  it('should decrypt correctly this message', function () {
    /**
     * Test found here
     * @link http://wiki.franklinheath.co.uk/index.php/Enigma/Sample_Messages
     */

    var machine = new EnigmaM4.default();

    machine.setReflector(new ThinReflectorB());

    var fourthRotor = new ThinRotorBeta();
    machine.setRotor(fourthRotor, EnigmaM4.FOURTH_ROTOR);

    var leftRotor = new RotorII();
    machine.setRotor(leftRotor, Enigma.LEFT_ROTOR);

    var centerRotor = new RotorIV();
    machine.setRotor(centerRotor, Enigma.CENTER_ROTOR);

    var rightRotor = new RotorI();
    rightRotor.setRingPosition(21);
    machine.setRotor(rightRotor, Enigma.RIGHT_ROTOR);

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
    machine.setRotorWindowLetter('J', Enigma.LEFT_ROTOR);
    machine.setRotorWindowLetter('N', Enigma.CENTER_ROTOR);

    var encodedMessage = 'NCZWVUSXPNYMINHZXMQXSFWXWLKJAHSHNMCOCCAKUQPMKCSMHKSEINJUSBLKIOSXCKUBHMLLXCSJUSRRDVKOHULXWCCBGVLIYXEOAHXRHKKFVDREWEZLXOBAFGYUJQUKGRTVUKAMEURBVEKSUHHVOYHABCJWMAKLFKLMYFVNRIZRVVRTKOFDANJMOLBGFFLEOPRGTFLVRHOWOPBEKVWMUQFMPWPARMFHAGKXIIBG';
                        //VONVONJLOOKSJHFFTTTEINSEINSDREIZWOYYQNNSNEUNINHALTXXBEIANGRIFFUNTERWASSERGEDRUECKTYWABOSXLETZTERGEGNERSTANDNULACHTDREINULUHRMARQUANTONJOTANEUNACHTSEYHSDREIYZWOZWONULGRADYACHTSMYSTOSSENACHXEKNSVIERMBFAELLTYNNNNNNOOOVIERYSICHTEINSNULL
    var decodedMessage = machine.encode(encodedMessage);

    machine.setRotorWindowLetter('V', EnigmaM4.FOURTH_ROTOR);
    machine.setRotorWindowLetter('J', Enigma.LEFT_ROTOR);
    machine.setRotorWindowLetter('N', Enigma.CENTER_ROTOR);
    machine.setRotorWindowLetter('A', Enigma.RIGHT_ROTOR);

    expect(machine.encode(decodedMessage)).toBe(encodedMessage);
  });

});
