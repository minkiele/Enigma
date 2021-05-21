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
var Component_1 = __importDefault(require("../Component"));
var Utils_1 = require("../Utils");
var PlugBoard = /** @class */ (function (_super) {
    __extends(PlugBoard, _super);
    function PlugBoard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wirings = [];
        return _this;
    }
    PlugBoard.prototype.plugWire = function (firstLetter, secondLetter) {
        firstLetter = Utils_1.normalizeInput(firstLetter);
        secondLetter = Utils_1.normalizeInput(secondLetter);
        if (firstLetter === secondLetter) {
            throw 'Cannot plug the same letter';
        }
        for (var i = 0; i < this.wirings.length; i += 1) {
            var _a = this.wirings[i], wiringFirstLetter = _a[0], wiringSecondLetter = _a[1];
            if (wiringFirstLetter === firstLetter ||
                wiringSecondLetter === secondLetter ||
                wiringSecondLetter === firstLetter ||
                wiringFirstLetter === secondLetter) {
                return false;
            }
        }
        var wire = [firstLetter, secondLetter];
        this.wirings.push(wire);
        this.emit('change.wirePlugged', firstLetter, secondLetter);
        return true;
    };
    PlugBoard.prototype.unplugWire = function (firstLetter, secondLetter) {
        firstLetter = Utils_1.normalizeInput(firstLetter);
        secondLetter = Utils_1.normalizeInput(secondLetter);
        for (var i = 0; i < this.wirings.length; i += 1) {
            var _a = this.wirings[i], wiringFirstLetter = _a[0], wiringSecondLetter = _a[1];
            if ((wiringFirstLetter === firstLetter &&
                wiringSecondLetter === secondLetter) ||
                (wiringSecondLetter === firstLetter &&
                    wiringFirstLetter === secondLetter)) {
                this.wirings.splice(i, 1);
                this.emit('change.wireUnplugged', firstLetter, secondLetter);
                return true;
            }
        }
        return false;
    };
    PlugBoard.prototype.plugWires = function (wires) {
        var _this = this;
        wires.forEach(function (wire) {
            _this.plugWire(wire[0], wire[1]);
        });
    };
    PlugBoard.prototype.unplugAllWires = function () {
        this.wirings.splice(0, this.wirings.length);
    };
    PlugBoard.prototype.getSwappedLetter = function (inputLetter) {
        inputLetter = Utils_1.normalizeInput(inputLetter);
        for (var i = 0; i < this.wirings.length; i += 1) {
            var _a = this.wirings[i], wiringFirstLetter = _a[0], wiringSecondLetter = _a[1];
            if (wiringFirstLetter === inputLetter) {
                return wiringSecondLetter;
            }
            else if (wiringSecondLetter === inputLetter) {
                return wiringFirstLetter;
            }
        }
        return inputLetter;
    };
    return PlugBoard;
}(Component_1.default));
exports.default = PlugBoard;
