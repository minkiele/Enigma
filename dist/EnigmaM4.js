"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Enigma_1 = __importDefault(require("./Enigma"));
var ThinRotor_1 = __importDefault(require("./Component/WiredWheel/Rotor/ThinRotor"));
var Reflector_1 = __importDefault(require("./Component/WiredWheel/Reflector"));
var ThinReflector_1 = __importDefault(require("./Component/WiredWheel/Reflector/ThinReflector"));
var FOURTH_ROTOR = 'F';
var EnigmaM4 = /** @class */ (function (_super) {
    __extends(EnigmaM4, _super);
    function EnigmaM4() {
        var _this = _super.call(this) || this;
        _this.setRotor(null, FOURTH_ROTOR);
        return _this;
    }
    EnigmaM4.prototype.encodeForward = function (inputLetter) {
        var leftRotorForwardOutputPosition = _super.prototype.encodeForward.call(this, inputLetter);
        if (this.isClassicConfiguration()) {
            return leftRotorForwardOutputPosition;
        }
        else {
            //FOURTH ROTOR
            var fourthRotorForwardInputPin = this.getRotorInputPosition(leftRotorForwardOutputPosition, FOURTH_ROTOR);
            var fourthRotorForwardOutputPin = this.getRotor(FOURTH_ROTOR).pinToPlate(fourthRotorForwardInputPin);
            var fourthRotorForwardOutputPosition = this.getRotorOutputPosition(fourthRotorForwardOutputPin, FOURTH_ROTOR);
            return fourthRotorForwardOutputPosition;
        }
    };
    EnigmaM4.prototype.encodeBackwards = function (reflectedPosition) {
        var inputReflectedPosition;
        if (this.isClassicConfiguration()) {
            inputReflectedPosition = reflectedPosition;
        }
        else {
            //FOURTH ROTOR
            var fourthRotorBackwardsInputPin = this.getRotorInputPosition(reflectedPosition, FOURTH_ROTOR);
            var fourthRotorBackwardsOutputPin = this.getRotor(FOURTH_ROTOR).plateToPin(fourthRotorBackwardsInputPin);
            var fourthRotorBackwardsOutputPosition = this.getRotorOutputPosition(fourthRotorBackwardsOutputPin, FOURTH_ROTOR);
            inputReflectedPosition = fourthRotorBackwardsOutputPosition;
        }
        return _super.prototype.encodeBackwards.call(this, inputReflectedPosition);
    };
    EnigmaM4.prototype.isClassicConfiguration = function () {
        return (this.getRotor(FOURTH_ROTOR) === null &&
            this.reflector instanceof Reflector_1.default &&
            !(this.reflector instanceof ThinReflector_1.default));
    };
    EnigmaM4.prototype.isMachineValidState = function () {
        var superTest = _super.prototype.isMachineValidState.call(this);
        if (this.isClassicConfiguration()) {
            return superTest;
        }
        else {
            return (superTest &&
                this.getRotor(FOURTH_ROTOR) instanceof ThinRotor_1.default &&
                this.reflector instanceof ThinReflector_1.default);
        }
    };
    EnigmaM4.FOURTH_ROTOR = FOURTH_ROTOR;
    return EnigmaM4;
}(Enigma_1.default));
exports.default = EnigmaM4;
