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

var RotorVIII = function (_Rotor) {
  _inherits(RotorVIII, _Rotor);

  function RotorVIII() {
    _classCallCheck(this, RotorVIII);

    var _this = _possibleConstructorReturn(this, (RotorVIII.__proto__ || Object.getPrototypeOf(RotorVIII)).call(this));

    _this.wirings = 'FKQHTLXOCBJSPDZRAMEWNIUYGV';
    _this.notchPosition = 'HU';
    return _this;
  }

  return RotorVIII;
}(_Rotor3.default);

exports.default = RotorVIII;
module.exports = exports['default'];