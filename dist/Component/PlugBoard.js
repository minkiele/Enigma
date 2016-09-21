"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlugBoard = function () {
  function PlugBoard() {
    _classCallCheck(this, PlugBoard);

    this.wirings = [];
  }

  _createClass(PlugBoard, [{
    key: "plugWire",
    value: function plugWire(firstLetter, secondLetter) {
      var wire = [firstLetter, secondLetter];
      this.wirings.push(wire);
    }
  }, {
    key: "getSwappedLetter",
    value: function getSwappedLetter(inputLetter) {
      var normalizedInputLetter = inputLetter.toUpperCase();
      for (var i = 0; i < this.wirings.length; i += 1) {
        if (this.wirings[i][0] === inputLetter) {
          return this.wirings[i][1];
        } else if (this.wirings[i][1] === inputLetter) {
          return this.wirings[i][0];
        }
      }

      return normalizedInputLetter;
    }
  }]);

  return PlugBoard;
}();

exports.default = PlugBoard;
module.exports = exports["default"];