"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Component2 = require("../Component");

var _Component3 = _interopRequireDefault(_Component2);

var _Utils = require("../Utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PlugBoard = function (_Component) {
  _inherits(PlugBoard, _Component);

  function PlugBoard() {
    _classCallCheck(this, PlugBoard);

    var _this = _possibleConstructorReturn(this, (PlugBoard.__proto__ || Object.getPrototypeOf(PlugBoard)).call(this));

    _this.wirings = [];
    return _this;
  }

  _createClass(PlugBoard, [{
    key: "plugWire",
    value: function plugWire(firstLetter, secondLetter) {

      firstLetter = (0, _Utils.normalizeInput)(firstLetter);
      secondLetter = (0, _Utils.normalizeInput)(secondLetter);

      if (firstLetter === secondLetter) {
        throw 'Cannot plug the same letter';
      }
      var wire = [firstLetter, secondLetter];
      this.wirings.push(wire);
    }
  }, {
    key: "unplugWire",
    value: function unplugWire(firstLetter, secondLetter) {

      firstLetter = (0, _Utils.normalizeInput)(firstLetter);
      secondLetter = (0, _Utils.normalizeInput)(secondLetter);

      for (var i = 0; i < this.wirings.length; i += 1) {
        if (this.wirings[i][0] === firstLetter && this.wirings[i][1] === secondLetter || this.wirings[i][1] === firstLetter && this.wirings[i][0] === secondLetter) {
          this.wirings.splice(i, 1);
          return true;
        }
      }

      return false;
    }
  }, {
    key: "getSwappedLetter",
    value: function getSwappedLetter(inputLetter) {

      inputLetter = (0, _Utils.normalizeInput)(inputLetter);

      for (var i = 0; i < this.wirings.length; i += 1) {
        if (this.wirings[i][0] === inputLetter) {
          return this.wirings[i][1];
        } else if (this.wirings[i][1] === inputLetter) {
          return this.wirings[i][0];
        }
      }

      return inputLetter;
    }
  }]);

  return PlugBoard;
}(_Component3.default);

exports.default = PlugBoard;
module.exports = exports["default"];