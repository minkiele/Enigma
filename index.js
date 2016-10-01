var baseDir = './dist/';

var Enigma = require(baseDir + 'Enigma');
var EnigmaM4 = require(baseDir + 'EnigmaM4');
var Utils = require(baseDir + 'Utils');

var PlugBoard = require(baseDir + 'Component/PlugBoard');

var RotorI = require(baseDir + 'Component/WiredWheel/Rotor/RotorI');
var RotorII = require(baseDir + 'Component/WiredWheel/Rotor/RotorII');
var RotorIII = require(baseDir + 'Component/WiredWheel/Rotor/RotorIII');
var RotorIV = require(baseDir + 'Component/WiredWheel/Rotor/RotorIV');
var RotorV = require(baseDir + 'Component/WiredWheel/Rotor/RotorV');
var RotorVI = require(baseDir + 'Component/WiredWheel/Rotor/RotorVI');
var RotorVII = require(baseDir + 'Component/WiredWheel/Rotor/RotorVII');
var RotorVIII = require(baseDir + 'Component/WiredWheel/Rotor/RotorVIII');

var ThinRotorBeta = require(baseDir + 'Component/WiredWheel/Rotor/ThinRotor/ThinRotorBeta');
var ThinRotorGamma = require(baseDir + 'Component/WiredWheel/Rotor/ThinRotor/ThinRotorGamma');

var ReflectorA = require(baseDir + 'Component/WiredWheel/Reflector/ReflectorA');
var ReflectorB = require(baseDir + 'Component/WiredWheel/Reflector/ReflectorB');
var ReflectorC = require(baseDir + 'Component/WiredWheel/Reflector/ReflectorC');
var ReflectorBeta = require(baseDir + 'Component/WiredWheel/Reflector/ReflectorBeta');
var ReflectorGamma = require(baseDir + 'Component/WiredWheel/Reflector/ReflectorGamma');
var ThinReflectorB = require(baseDir + 'Component/WiredWheel/Reflector/ThinReflector/ThinReflectorB');
var ThinReflectorC = require(baseDir + 'Component/WiredWheel/Reflector/ThinReflector/ThinReflectorC');

module.exports = {
  Enigma: Enigma,
  EnigmaM4: EnigmaM4,
  Utils: Utils,

  RotorI: RotorI,
  RotorII: RotorII,
  RotorIII: RotorIII,
  RotorIV: RotorIV,
  RotorV: RotorV,
  RotorVI: RotorVI,
  RotorVII: RotorVII,
  RotorVIII: RotorVIII,

  ThinRotorBeta: ThinRotorBeta,
  ThinRotorGamma: ThinRotorGamma,

  ReflectorA: ReflectorA,
  ReflectorB: ReflectorB,
  ReflectorC: ReflectorC,
  ReflectorBeta: ReflectorBeta,
  ReflectorGamma: ReflectorGamma,
  ThinReflectorB: ThinReflectorB,
  ThinReflectorC: ThinReflectorC
};
