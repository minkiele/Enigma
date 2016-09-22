"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FOURTH_ROTOR = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Enigma2 = require("./Enigma");

var _Enigma3 = _interopRequireDefault(_Enigma2);

var _ThinRotor = require("./Component/WiredWheel/Rotor/ThinRotor");

var _ThinRotor2 = _interopRequireDefault(_ThinRotor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FOURTH_ROTOR = exports.FOURTH_ROTOR = 'F';

var EnigmaM4 = function (_Enigma) {
  _inherits(EnigmaM4, _Enigma);

  function EnigmaM4() {
    _classCallCheck(this, EnigmaM4);

    var _this = _possibleConstructorReturn(this, (EnigmaM4.__proto__ || Object.getPrototypeOf(EnigmaM4)).call(this));

    _this.setRotor(null, FOURTH_ROTOR);
    return _this;
  }

  _createClass(EnigmaM4, [{
    key: "encodeForward",
    value: function encodeForward(inputLetter) {

      var leftRotorForwardOutputPosition = _get(EnigmaM4.prototype.__proto__ || Object.getPrototypeOf(EnigmaM4.prototype), "encodeForward", this).call(this, inputLetter);

      //FOURTH ROTOR
      var fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
      var fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR).pinToPlate(fourthRotorForwardInputPin);
      var fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);

      return fourthRotorForwardOutputPosition;
    }
  }, {
    key: "encodeBackwards",
    value: function encodeBackwards(reflectedPosition) {

      //FOURTH ROTOR
      var fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
      var fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR).plateToPin(fourthRotorBackwardsInputPin);
      var fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);

      return _get(EnigmaM4.prototype.__proto__ || Object.getPrototypeOf(EnigmaM4.prototype), "encodeBackwards", this).call(this, fourthRotorBackwardsOutputPosition);
    }
  }]);

  return EnigmaM4;
}(_Enigma3.default);

exports.default = EnigmaM4;