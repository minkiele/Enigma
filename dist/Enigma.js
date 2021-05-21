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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PlugBoard_1 = __importDefault(require("./Component/PlugBoard"));
var Utils = __importStar(require("./Utils"));
var EntryWheel_1 = __importDefault(require("./Component/WiredWheel/EntryWheel"));
var Rotor_1 = __importDefault(require("./Component/WiredWheel/Rotor"));
var Reflector_1 = __importDefault(require("./Component/WiredWheel/Reflector"));
var events_1 = __importDefault(require("events"));
var LEFT_ROTOR = 'L';
var CENTER_ROTOR = 'C';
var RIGHT_ROTOR = 'R';
var Enigma = /** @class */ (function (_super) {
    __extends(Enigma, _super);
    function Enigma() {
        var _this = _super.call(this) || this;
        _this.plugBoard = new PlugBoard_1.default();
        _this.entryWheel = new EntryWheel_1.default();
        _this.rotors = {};
        _this.rotorsWindowLetter = {};
        _this.setRotor(null, LEFT_ROTOR);
        _this.setRotor(null, CENTER_ROTOR);
        _this.setRotor(null, RIGHT_ROTOR);
        return _this;
    }
    Enigma.prototype.getPlugBoard = function () {
        return this.plugBoard;
    };
    Enigma.prototype.setRotor = function (rotor, position) {
        this.rotors[position] = rotor;
        this.emit('change.rotorSet', rotor, position);
        this.setRotorWindowLetter('A', position);
        return this;
    };
    Enigma.prototype.getRotor = function (position) {
        return this.rotors[position];
    };
    Enigma.prototype.setReflector = function (reflector) {
        this.reflector = reflector;
        this.emit('change.reflectorSet', reflector);
        return this;
    };
    Enigma.prototype.setRotorWindowLetter = function (letter, position) {
        this.rotorsWindowLetter[position] = letter;
        this.emit('change.rotorWindowLetterSet', letter, position, this.getRotor(position));
        return this;
    };
    Enigma.prototype.getRotorWindowLetter = function (position) {
        return this.rotorsWindowLetter[position];
    };
    Enigma.prototype.isRotorInNotchPosition = function (position) {
        var notchLetter = Utils.getNotchLetter(this.getRotorWindowLetter(position));
        return this.getRotor(position).notchPosition.indexOf(notchLetter) > -1;
    };
    Enigma.prototype.advanceRotor = function (position) {
        this.setRotorWindowLetter(Utils.getNextLetter(this.getRotorWindowLetter(position)), position);
        this.emit('change.rotorAdvanced', position, this.getRotor(position), this.getRotorWindowLetter(position));
        return this;
    };
    Enigma.prototype.advanceRotors = function () {
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
        this.emit('change.rotorsAdvanced');
        return this;
    };
    Enigma.prototype.encodeForward = function (inputLetter) {
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
    };
    Enigma.prototype.encodeReflect = function (leftRotorForwardOutputPosition) {
        //REFLECTION
        var reflectedPosition = this.reflector.pinToPin(leftRotorForwardOutputPosition);
        //AND NOW BACKWARDS!
        return reflectedPosition;
    };
    Enigma.prototype.encodeBackwards = function (reflectedPosition) {
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
    };
    Enigma.prototype.getEncodedLetter = function (inputLetter) {
        if (!this.isMachineValidState()) {
            throw 'Machine is not in valid state';
        }
        this.advanceRotors();
        var leftRotorForwardOutputPosition = this.encodeForward(inputLetter);
        var reflectedPosition = this.encodeReflect(leftRotorForwardOutputPosition);
        var swappedOutputLetter = this.encodeBackwards(reflectedPosition);
        return swappedOutputLetter;
    };
    Enigma.prototype.getRotorInputPosition = function (inputPosition, rotor) {
        return Utils.getModularNumber(inputPosition +
            Utils.getIndex(this.getRotorWindowLetter(rotor)) -
            this.getRotor(rotor).ringPosition);
    };
    Enigma.prototype.getRotorOutputPosition = function (outputPosition, rotor) {
        return Utils.getModularNumber(outputPosition -
            Utils.getIndex(this.getRotorWindowLetter(rotor)) +
            this.getRotor(rotor).ringPosition);
    };
    Enigma.prototype.encode = function (string) {
        var output = '';
        for (var i = 0; i < string.length; i += 1) {
            output += this.getEncodedLetter(string.charAt(i));
        }
        return output;
    };
    Enigma.prototype.isMachineValidState = function () {
        return (this.getRotor(LEFT_ROTOR) instanceof Rotor_1.default &&
            this.getRotor(CENTER_ROTOR) instanceof Rotor_1.default &&
            this.getRotor(RIGHT_ROTOR) instanceof Rotor_1.default &&
            this.reflector instanceof Reflector_1.default);
    };
    Enigma.LEFT_ROTOR = LEFT_ROTOR;
    Enigma.CENTER_ROTOR = CENTER_ROTOR;
    Enigma.RIGHT_ROTOR = RIGHT_ROTOR;
    return Enigma;
}(events_1.default));
exports.default = Enigma;
