"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectorGamma = exports.ReflectorD = exports.ReflectorC = exports.ReflectorBeta = exports.ReflectorB = exports.ReflectorA = void 0;
__exportStar(require("./ThinReflector/index"), exports);
var ReflectorA_1 = require("./ReflectorA");
Object.defineProperty(exports, "ReflectorA", { enumerable: true, get: function () { return __importDefault(ReflectorA_1).default; } });
var ReflectorB_1 = require("./ReflectorB");
Object.defineProperty(exports, "ReflectorB", { enumerable: true, get: function () { return __importDefault(ReflectorB_1).default; } });
var ReflectorBeta_1 = require("./ReflectorBeta");
Object.defineProperty(exports, "ReflectorBeta", { enumerable: true, get: function () { return __importDefault(ReflectorBeta_1).default; } });
var ReflectorC_1 = require("./ReflectorC");
Object.defineProperty(exports, "ReflectorC", { enumerable: true, get: function () { return __importDefault(ReflectorC_1).default; } });
var ReflectorD_1 = require("./ReflectorD");
Object.defineProperty(exports, "ReflectorD", { enumerable: true, get: function () { return __importDefault(ReflectorD_1).default; } });
var ReflectorGamma_1 = require("./ReflectorGamma");
Object.defineProperty(exports, "ReflectorGamma", { enumerable: true, get: function () { return __importDefault(ReflectorGamma_1).default; } });
