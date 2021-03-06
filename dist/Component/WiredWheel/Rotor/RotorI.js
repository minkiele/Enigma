'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Rotor2 = require('../Rotor');

var _Rotor3 = _interopRequireDefault(_Rotor2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RotorI = function (_Rotor) {
  _inherits(RotorI, _Rotor);

  function RotorI() {
    _classCallCheck(this, RotorI);

    var _this = _possibleConstructorReturn(this, (RotorI.__proto__ || Object.getPrototypeOf(RotorI)).call(this));

    _this.wirings = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    _this.notchPosition = 'Y';
    return _this;
  }

  return RotorI;
}(_Rotor3.default);

exports.default = RotorI;
module.exports = exports['default'];