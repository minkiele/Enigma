'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Reflector2 = require('../Reflector');

var _Reflector3 = _interopRequireDefault(_Reflector2);

var _Utils = require('../../../Utils');

var Utils = _interopRequireWildcard(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COUPLES = 13;
var LOWER_LIMIT = 0;
var UPPER_LIMIT = 26;
var PERMANENTLY_WIRED_0 = 0;
var PERMANENTLY_WIRED_1 = 13;

var ReflectorD = function (_Reflector) {
  _inherits(ReflectorD, _Reflector);

  function ReflectorD() {
    _classCallCheck(this, ReflectorD);

    var _this = _possibleConstructorReturn(this, (ReflectorD.__proto__ || Object.getPrototypeOf(ReflectorD)).call(this));

    _this.wirings = [[PERMANENTLY_WIRED_0, PERMANENTLY_WIRED_1]];
    return _this;
  }

  _createClass(ReflectorD, [{
    key: 'plugWire',
    value: function plugWire(position1, position2) {

      if (this.wirings.length >= COUPLES) {
        throw 'All plugs have been wired';
      }

      if (!this.arePlugsWireable(position1, position2)) {
        throw 'This couple is permanently wired and therefore cannot be plugged';
      }

      if (position1 === position2) {
        throw 'Cannot wire the same letter';
      }

      if (!(position1 >= LOWER_LIMIT && position1 < UPPER_LIMIT && position2 >= LOWER_LIMIT && position2 < UPPER_LIMIT)) {
        throw 'Wiring indexes out of bounds';
      }

      for (var i = 0; i < this.wirings.length; i += 1) {
        if (this.wirings[i][0] === position1 || this.wirings[i][1] === position1 || this.wirings[i][0] === position2 || this.wirings[i][1] === position2) {
          throw 'At least one of the plugs is already wired';
        }
      }

      this.wirings.push([position1, position2]);
      this.emit('change.wirePlugged', position1, position2);
    }
  }, {
    key: 'arePlugsWireable',
    value: function arePlugsWireable(position1, position2) {
      return !(position1 === PERMANENTLY_WIRED_0 && position2 === PERMANENTLY_WIRED_1 || position1 === PERMANENTLY_WIRED_1 && position2 === PERMANENTLY_WIRED_0);
    }
  }, {
    key: 'unplugWire',
    value: function unplugWire(position1, position2) {

      if (!this.arePlugsWireable(position1, position2)) {
        throw 'This couple is permanently wired and therefore cannot be unplugged';
      }

      for (var i = 0; i < this.wirings.length; i += 1) {
        if (this.wirings[i][0] === position1 && this.wirings[i][1] === position2 || this.wirings[i][0] === position2 && this.wirings[i][1] === position1) {
          this.wirings.splice(i, 1);
          this.emit('change.wireUnplugged', position1, position2);
        }
      }
    }
  }, {
    key: 'pinToPin',
    value: function pinToPin(inputPin) {
      for (var i = 0; i < this.wirings.length; i += 1) {
        if (this.wirings[i][0] === inputPin) {
          return this.wirings[i][1];
        } else if (this.wirings[i][1] === inputPin) {
          return this.wirings[i][0];
        }
      }

      throw 'This pin is not wired';
    }
  }, {
    key: 'getReflectedLetter',
    value: function getReflectedLetter(inputLetter) {
      throw 'This method has various interpretations on this reflector';
    }
  }, {
    key: 'getIndexFromGermanNotation',
    value: function getIndexFromGermanNotation(letter) {

      var normalizedLetter = Utils.normalizeInput(letter);
      var index = Utils.getIndex(letter);

      if (index === 9 || index === 24) {
        throw 'J and Y letters do not appear in German notation';
      }

      if (index > 8 && index < 13 || index === 25) {
        index -= 1;
      }

      return 25 - index;
    }
  }, {
    key: 'getIndexFromAlliedNotation',
    value: function getIndexFromAlliedNotation(letter) {
      var normalizedLetter = Utils.normalizeInput(letter);
      var index = Utils.getIndex(letter);
      return Utils.getModularNumber(index + 25);
    }

    //  getIndexFromEnigmaNotation(index) {
    //    return index - 1;
    //  }

  }, {
    key: 'plugWireInGermanNotation',
    value: function plugWireInGermanNotation(letter1, letter2) {
      this.plugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
    }
  }, {
    key: 'unplugWireInGermanNotation',
    value: function unplugWireInGermanNotation(letter1, letter2) {
      this.unplugWire(this.getIndexFromGermanNotation(letter1), this.getIndexFromGermanNotation(letter2));
    }
  }, {
    key: 'plugWireInAlliedNotation',
    value: function plugWireInAlliedNotation(letter1, letter2) {
      this.plugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
    }
  }, {
    key: 'unplugWireInAlliedNotation',
    value: function unplugWireInAlliedNotation(letter1, letter2) {
      this.unplugWire(this.getIndexFromAlliedNotation(letter1), this.getIndexFromAlliedNotation(letter2));
    }
  }]);

  return ReflectorD;
}(_Reflector3.default);

exports.default = ReflectorD;
module.exports = exports['default'];