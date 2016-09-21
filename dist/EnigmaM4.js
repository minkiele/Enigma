"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FOURTH_ROTOR = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Enigma = require("./Enigma");

var Enigma = _interopRequireWildcard(_Enigma);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FOURTH_ROTOR = exports.FOURTH_ROTOR = 'F';

var EnigmaM4 = function (_Enigma$Enigma) {
    _inherits(EnigmaM4, _Enigma$Enigma);

    function EnigmaM4() {
        _classCallCheck(this, EnigmaM4);

        var _this = _possibleConstructorReturn(this, (EnigmaM4.__proto__ || Object.getPrototypeOf(EnigmaM4)).call(this));

        _this.setRotor(null, FOURTH_ROTOR);
        return _this;
    }

    _createClass(EnigmaM4, [{
        key: "getEncodedLetter",
        value: function getEncodedLetter(inputLetter) {

            this.advanceRotors();

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

            //FOURTH ROTOR
            var fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
            var fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR).pinToPlate(fourthRotorInputPin);
            var fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);

            //REFLECTION
            var reflectedPosition = this.reflector.pinToPin(fourthRotorForwardOutputPosition);
            //AND NOW BACKWARDS!

            //FOURTH ROTOR
            var fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
            var fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR).plateToPin(fourthRotorBackwardsInputPin);
            var fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);

            //LEFT ROTOR
            var leftRotorInputPlate = this.getRotorInputPosition(fourthRotorBackwardsOutputPosition, LEFT_ROTOR);
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
    }]);

    return EnigmaM4;
}(Enigma.Enigma);

exports.default = EnigmaM4;