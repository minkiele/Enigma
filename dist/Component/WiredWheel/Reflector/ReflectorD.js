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
var Reflector_1 = __importDefault(require("../Reflector"));
var Utils = __importStar(require("../../../Utils"));
var COUPLES = 13;
var LOWER_LIMIT = 0;
var UPPER_LIMIT = 26;
var PERMANENTLY_WIRED_0 = 0;
var PERMANENTLY_WIRED_1 = 13;
var ReflectorD = /** @class */ (function (_super) {
    __extends(ReflectorD, _super);
    function ReflectorD() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reflectorDWirings = [
            [PERMANENTLY_WIRED_0, PERMANENTLY_WIRED_1],
        ];
        return _this;
    }
    ReflectorD.prototype.plugWire = function (position1, position2) {
        if (this.reflectorDWirings.length >= COUPLES) {
            throw 'All plugs have been wired';
        }
        if (!this.arePlugsWireable(position1, position2)) {
            throw 'This couple is permanently wired and therefore cannot be plugged';
        }
        if (position1 === position2) {
            throw 'Cannot wire the same letter';
        }
        if (!(position1 >= LOWER_LIMIT &&
            position1 < UPPER_LIMIT &&
            position2 >= LOWER_LIMIT &&
            position2 < UPPER_LIMIT)) {
            throw 'Wiring indexes out of bounds';
        }
        for (var i = 0; i < this.reflectorDWirings.length; i += 1) {
            var _a = this.reflectorDWirings[i], wiredPosition1 = _a[0], wiredPosition2 = _a[1];
            if (wiredPosition1 === position1 ||
                wiredPosition2 === position1 ||
                wiredPosition1 === position2 ||
                wiredPosition2 === position2) {
                throw 'At least one of the plugs is already wired';
            }
        }
        this.reflectorDWirings.push([position1, position2]);
        this.emit('change.wirePlugged', position1, position2);
    };
    ReflectorD.prototype.arePlugsWireable = function (position1, position2) {
        return !((position1 === PERMANENTLY_WIRED_0 &&
            position2 === PERMANENTLY_WIRED_1) ||
            (position1 === PERMANENTLY_WIRED_1 && position2 === PERMANENTLY_WIRED_0));
    };
    ReflectorD.prototype.unplugWire = function (position1, position2) {
        if (!this.arePlugsWireable(position1, position2)) {
            throw 'This couple is permanently wired and therefore cannot be unplugged';
        }
        for (var i = 0; i < this.reflectorDWirings.length; i += 1) {
            var _a = this.reflectorDWirings[i], wiredPosition1 = _a[0], wiredPosition2 = _a[1];
            if ((wiredPosition1 === position1 && wiredPosition2 === position2) ||
                (wiredPosition1 === position2 && wiredPosition2 === position1)) {
                this.reflectorDWirings.splice(i, 1);
                this.emit('change.wireUnplugged', position1, position2);
            }
        }
    };
    ReflectorD.prototype.pinToPin = function (inputPin) {
        for (var i = 0; i < this.reflectorDWirings.length; i += 1) {
            var _a = this.reflectorDWirings[i], wiredPosition1 = _a[0], wiredPosition2 = _a[1];
            if (wiredPosition1 === inputPin) {
                return wiredPosition2;
            }
            else if (wiredPosition2 === inputPin) {
                return wiredPosition1;
            }
        }
        throw 'This pin is not wired';
    };
    ReflectorD.prototype.getReflectedLetter = function () {
        throw 'This method has various interpretations on this reflector';
    };
    ReflectorD.prototype.getIndexFromGermanNotation = function (letter) {
        // const normalizedLetter = Utils.normalizeInput(letter);
        var index = Utils.getIndex(letter);
        if (index === 9 || index === 24) {
            throw 'J and Y letters do not appear in German notation';
        }
        if ((index > 8 && index < 13) || index === 25) {
            index -= 1;
        }
        return 25 - index;
    };
    ReflectorD.prototype.getIndexFromAlliedNotation = function (letter) {
        // const normalizedLetter = Utils.normalizeInput(letter);
        var index = Utils.getIndex(letter);
        return Utils.getModularNumber(index + 25);
    };
    ReflectorD.prototype.plugWireInGermanNotation = function (letter1, letter2) {
        this.plugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
    };
    ReflectorD.prototype.unplugWireInGermanNotation = function (letter1, letter2) {
        this.unplugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
    };
    ReflectorD.prototype.plugWireInAlliedNotation = function (letter1, letter2) {
        this.plugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
    };
    ReflectorD.prototype.unplugWireInAlliedNotation = function (letter1, letter2) {
        this.unplugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
    };
    return ReflectorD;
}(Reflector_1.default));
exports.default = ReflectorD;
