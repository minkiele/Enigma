import ReflectorB from '../enigma/Component/WiredWheel/Reflector/ReflectorB.js';
import ThinReflectorB from '../enigma/Component/WiredWheel/Reflector/ThinReflector/ThinReflectorB.js';
import RotorI from '../enigma/Component/WiredWheel/Rotor/RotorI.js';
import RotorII from '../enigma/Component/WiredWheel/Rotor/RotorII.js';
import RotorIII from '../enigma/Component/WiredWheel/Rotor/RotorIII.js';
import RotorIV from '../enigma/Component/WiredWheel/Rotor/RotorIV.js';
import ThinRotorBeta from '../enigma/Component/WiredWheel/Rotor/ThinRotor/ThinRotorBeta.js';
import EnigmaM4 from '../enigma/Enigma/EnigmaM4.js';

describe('EnigmaM4 Machine', () => {
  it('should decrypt correctly this message', () => {
    /**
     * Test found here
     * @link http://wiki.franklinheath.co.uk/index.php/Enigma/Sample_Messages
     */

    const machine = new EnigmaM4();

    machine.setReflector(new ThinReflectorB());

    const fourthRotor = new ThinRotorBeta();
    machine.setRotor(fourthRotor, EnigmaM4.FOURTH_ROTOR);

    const leftRotor = new RotorII();
    machine.setRotor(leftRotor, EnigmaM4.LEFT_ROTOR);

    const centerRotor = new RotorIV();
    machine.setRotor(centerRotor, EnigmaM4.CENTER_ROTOR);

    const rightRotor = new RotorI();
    rightRotor.setRingPosition(21);
    machine.setRotor(rightRotor, EnigmaM4.RIGHT_ROTOR);

    const plugBoard = machine.getPlugBoard();

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

    const encodedMessage =
      'NCZWVUSXPNYMINHZXMQXSFWXWLKJAHSHNMCOCCAKUQPMKCSMHKSEINJUSBLKIOSXCKUBHMLLXCSJUSRRDVKOHULXWCCBGVLIYXEOAHXRHKKFVDREWEZLXOBAFGYUJQUKGRTVUKAMEURBVEKSUHHVOYHABCJWMAKLFKLMYFVNRIZRVVRTKOFDANJMOLBGFFLEOPRGTFLVRHOWOPBEKVWMUQFMPWPARMFHAGKXIIBG.js';
    //VONVONJLOOKSJHFFTTTEINSEINSDREIZWOYYQNNSNEUNINHALTXXBEIANGRIFFUNTERWASSERGEDRUECKTYWABOSXLETZTERGEGNERSTANDNULACHTDREINULUHRMARQUANTONJOTANEUNACHTSEYHSDREIYZWOZWONULGRADYACHTSMYSTOSSENACHXEKNSVIERMBFAELLTYNNNNNNOOOVIERYSICHTEINSNULL
    const decodedMessage = machine.encode(encodedMessage);

    machine.setRotorWindowLetter('V', EnigmaM4.FOURTH_ROTOR);
    machine.setRotorWindowLetter('J', EnigmaM4.LEFT_ROTOR);
    machine.setRotorWindowLetter('N', EnigmaM4.CENTER_ROTOR);
    machine.setRotorWindowLetter('A', EnigmaM4.RIGHT_ROTOR);

    expect(machine.encode(decodedMessage)).toBe(encodedMessage);
  });
});

describe('Enigma M4 Machine (in classic mode)', () => {
  it('should encode AAAAA IN BDZGO', () => {
    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    const machine = new EnigmaM4();

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

  it('should encode AAAAA IN EWTYX', () => {
    /**
     * Test found here
     * https://en.wikipedia.org/wiki/Enigma_rotor_details#Rotor_offset
     */

    const machine = new EnigmaM4();

    const leftRotor = new RotorI();
    leftRotor.setRingSetting('B');
    const centerRotor = new RotorII();
    centerRotor.setRingSetting('B');
    const rightRotor = new RotorIII();
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
