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
var WiredWheel_1 = __importDefault(require("../WiredWheel"));
var Utils = __importStar(require("../../Utils"));
var Rotor = /** @class */ (function (_super) {
    __extends(Rotor, _super);
    function Rotor() {
        var _this = _super.call(this) || this;
        _this.setRingPosition(0);
        return _this;
    }
    Rotor.prototype.pinToPlate = function (inputPin) {
        return Utils.getIndex(this.wirings, inputPin);
    };
    Rotor.prototype.plateToPin = function (outputPlate) {
        return this.wirings.indexOf(Utils.getLetter(outputPlate));
    };
    Rotor.prototype.setRingPosition = function (ringPosition) {
        this.ringPosition = ringPosition;
        this.emit('change.ringPositionSet', ringPosition);
    };
    Rotor.prototype.setRingSetting = function (ringSetting) {
        this.setRingPosition(Utils.getIndex(ringSetting));
        this.emit('change.ringSettingSet', ringSetting);
    };
    Rotor.prototype.getOutputLetter = function (inputLetter) {
        var normalizedInputLetter = inputLetter.toUpperCase();
        var inputIndex = Utils.getIndex(normalizedInputLetter);
        var normalizedInputIndex = Utils.getModularNumber(inputIndex - this.ringPosition);
        var normalizedOutputIndex = this.pinToPlate(normalizedInputIndex);
        var outputIndex = Utils.getModularNumber(normalizedOutputIndex + this.ringPosition);
        return Utils.getLetter(outputIndex);
    };
    Rotor.prototype.getInputLetter = function (outputLetter) {
        var normalizedOutputLetter = outputLetter.toUpperCase();
        var outputIndex = Utils.getIndex(normalizedOutputLetter);
        var normalizedOutputIndex = Utils.getModularNumber(outputIndex + this.ringPosition);
        var normalizedInputIndex = this.plateToPin(normalizedOutputIndex);
        var inputIndex = Utils.getModularNumber(normalizedInputIndex - this.ringPosition);
        return Utils.getLetter(inputIndex);
    };
    return Rotor;
}(WiredWheel_1.default));
exports.default = Rotor;
