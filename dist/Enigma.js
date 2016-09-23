"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RIGHT_ROTOR = exports.CENTER_ROTOR = exports.LEFT_ROTOR = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlugBoard = require("./Component/PlugBoard");

var _PlugBoard2 = _interopRequireDefault(_PlugBoard);

var _Utils = require("./Utils");

var Utils = _interopRequireWildcard(_Utils);

var _EntryWheel = require("./Component/WiredWheel/EntryWheel");

var _EntryWheel2 = _interopRequireDefault(_EntryWheel);

var _Rotor = require("./Component/WiredWheel/Rotor");

var _Rotor2 = _interopRequireDefault(_Rotor);

var _Reflector = require("./Component/WiredWheel/Reflector");

var _Reflector2 = _interopRequireDefault(_Reflector);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LEFT_ROTOR = exports.LEFT_ROTOR = 'L';
var CENTER_ROTOR = exports.CENTER_ROTOR = 'C';
var RIGHT_ROTOR = exports.RIGHT_ROTOR = 'R';

var Enigma = function () {
  function Enigma() {
    _classCallCheck(this, Enigma);

    this.plugBoard = new _PlugBoard2.default();
    this.entryWheel = new _EntryWheel2.default();
    this.rotors = {};
    this.rotorsWindowLetter = {};
    this.setRotor(null, LEFT_ROTOR);
    this.setRotor(null, CENTER_ROTOR);
    this.setRotor(null, RIGHT_ROTOR);
  }

  _createClass(Enigma, [{
    key: "getPlugBoard",
    value: function getPlugBoard() {
      return this.plugBoard;
    }
  }, {
    key: "setRotor",
    value: function setRotor(rotor, position) {
      this.rotors[position] = rotor;
      this.setRotorWindowLetter('A', position);
      return this;
    }
  }, {
    key: "getRotor",
    value: function getRotor(position) {
      return this.rotors[position];
    }
  }, {
    key: "setReflector",
    value: function setReflector(reflector) {
      this.reflector = reflector;
      return this;
    }
  }, {
    key: "setRotorWindowLetter",
    value: function setRotorWindowLetter(letter, position) {
      this.rotorsWindowLetter[position] = letter;
      return this;
    }
  }, {
    key: "getRotorWindowLetter",
    value: function getRotorWindowLetter(position) {
      return this.rotorsWindowLetter[position];
    }
  }, {
    key: "isRotorInNotchPosition",
    value: function isRotorInNotchPosition(position) {
      var notchLetter = Utils.getNotchLetter(this.getRotorWindowLetter(position));
      return this.getRotor(position).notchPosition.indexOf(notchLetter) > -1;
    }
  }, {
    key: "advanceRotor",
    value: function advanceRotor(rotor) {
      this.setRotorWindowLetter(Utils.getNextLetter(this.getRotorWindowLetter(rotor)), rotor);
      return this;
    }
  }, {
    key: "advanceRotors",
    value: function advanceRotors() {
      var isCenterNotch = this.isRotorInNotchPosition(CENTER_ROTOR);
      var isRightNotch = this.isRotorInNotchPosition(RIGHT_ROTOR);
      if (isCenterNotch) {
        this.advanceRotor(LEFT_ROTOR);
      }
      //And that's how we deal with the double step
      if (isCenterNotch || isRightNotch) {
        this.advanceRotor(CENTER_ROTOR);
      }
      this.advanceRotor(RIGHT_ROTOR);
      return this;
    }
  }, {
    key: "encodeForward",
    value: function encodeForward(inputLetter) {

      //FORWARD THROUGH THE NON ROTATING PARTS
      var normalizedInputLetter = inputLetter.toUpperCase();
      var swappedInputLetter = this.plugBoard.getSwappedLetter(normalizedInputLetter);
      var entryWheelInputPosition = this.entryWheel.getPlateFromLetter(swappedInputLetter);

      //RIGHT ROTOR
      var rightRotorInputPin = this.getRotorInputPosition(entryWheelInputPosition, RIGHT_ROTOR);
      var rightRotorOutputPlate = this.getRotor(RIGHT_ROTOR).pinToPlate(rightRotorInputPin);
      var rightRotorForwardOutputPosition = this.getRotorOutputPosition(rightRotorOutputPlate, RIGHT_ROTOR);

      //CENTER ROTOR
      var centerRotorInputPin = this.getRotorInputPosition(rightRotorForwardOutputPosition, CENTER_ROTOR);
      var centerRotorOutputPlate = this.getRotor(CENTER_ROTOR).pinToPlate(centerRotorInputPin);
      var centerRotorForwardOutputPosition = this.getRotorOutputPosition(centerRotorOutputPlate, CENTER_ROTOR);

      //LEFT ROTOR
      var leftRotorInputPin = this.getRotorInputPosition(centerRotorForwardOutputPosition, LEFT_ROTOR);
      var leftRotorOutputPlate = this.getRotor(LEFT_ROTOR).pinToPlate(leftRotorInputPin);
      var leftRotorForwardOutputPosition = this.getRotorOutputPosition(leftRotorOutputPlate, LEFT_ROTOR);

      return leftRotorForwardOutputPosition;
    }
  }, {
    key: "encodeReflect",
    value: function encodeReflect(leftRotorForwardOutputPosition) {
      //REFLECTION
      var reflectedPosition = this.reflector.pinToPin(leftRotorForwardOutputPosition);
      //AND NOW BACKWARDS!

      return reflectedPosition;
    }
  }, {
    key: "encodeBackwards",
    value: function encodeBackwards(reflectedPosition) {

      //LEFT ROTOR
      var leftRotorInputPlate = this.getRotorInputPosition(reflectedPosition, LEFT_ROTOR);
      var leftRotorOutputPin = this.getRotor(LEFT_ROTOR).plateToPin(leftRotorInputPlate);
      var leftRotorBackwardsOutputPosition = this.getRotorOutputPosition(leftRotorOutputPin, LEFT_ROTOR);

      //CENTER ROTOR
      var centerRotorInputPosition = this.getRotorInputPosition(leftRotorBackwardsOutputPosition, CENTER_ROTOR);
      var centerRotorOutputPin = this.getRotor(CENTER_ROTOR).plateToPin(centerRotorInputPosition);
      var centerRotorBackwardsOutputPosition = this.getRotorOutputPosition(centerRotorOutputPin, CENTER_ROTOR);

      //RIGHT ROTOR
      var rightRotorInputPlate = this.getRotorInputPosition(centerRotorBackwardsOutputPosition, RIGHT_ROTOR);
      var rightRotorOutputPin = this.getRotor(RIGHT_ROTOR).plateToPin(rightRotorInputPlate);
      var rightRotorBackwardsOutputPosition = this.getRotorOutputPosition(rightRotorOutputPin, RIGHT_ROTOR);

      //AND THROUGH AGAIN THE NON ROTATING PARTS
      var entryWheelOutputLetter = this.entryWheel.getLetterFromPlate(rightRotorBackwardsOutputPosition);
      var swappedOutputLetter = this.plugBoard.getSwappedLetter(entryWheelOutputLetter);

      return swappedOutputLetter;
    }
  }, {
    key: "getEncodedLetter",
    value: function getEncodedLetter(inputLetter) {

      if (!this.isMachineValidState()) {
        throw "Machine is not in valid state";
      }

      this.advanceRotors();

      var leftRotorForwardOutputPosition = this.encodeForward(inputLetter);
      var reflectedPosition = this.encodeReflect(leftRotorForwardOutputPosition);
      var swappedOutputLetter = this.encodeBackwards(reflectedPosition);

      return swappedOutputLetter;
    }
  }, {
    key: "getRotorInputPosition",
    value: function getRotorInputPosition(inputPosition, rotor) {
      return Utils.getModularNumber(inputPosition + Utils.getIndex(this.getRotorWindowLetter(rotor)) - this.getRotor(rotor).ringPosition);
    }
  }, {
    key: "getRotorOutputPosition",
    value: function getRotorOutputPosition(outputPosition, rotor) {
      return Utils.getModularNumber(outputPosition - Utils.getIndex(this.getRotorWindowLetter(rotor)) + this.getRotor(rotor).ringPosition);
    }
  }, {
    key: "encode",
    value: function encode(string) {
      var output = '';
      var normalizedString = string.toUpperCase();
      for (var i = 0; i < string.length; i += 1) {
        output += this.getEncodedLetter(string.charAt(i));
      }
      return output;
    }
  }, {
    key: "isMachineValidState",
    value: function isMachineValidState() {
      return this.getRotor(LEFT_ROTOR) instanceof _Rotor2.default && this.getRotor(CENTER_ROTOR) instanceof _Rotor2.default && this.getRotor(RIGHT_ROTOR) instanceof _Rotor2.default && this.reflector instanceof _Reflector2.default;
    }
  }]);

  return Enigma;
}();

exports.default = Enigma;