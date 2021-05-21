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
var WiredWheel_1 = __importDefault(require("../WiredWheel"));
var Utils_1 = require("../../Utils");
var EntryWheel = /** @class */ (function (_super) {
    __extends(EntryWheel, _super);
    function EntryWheel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EntryWheel.prototype.getPlateFromLetter = function (letter) {
        return Utils_1.getIndex(letter);
    };
    EntryWheel.prototype.getLetterFromPlate = function (plate) {
        return Utils_1.getLetter(plate);
    };
    return EntryWheel;
}(WiredWheel_1.default));
exports.default = EntryWheel;
