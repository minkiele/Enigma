"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _WiredWheel = require("./WiredWheel");

var _WiredWheel2 = _interopRequireDefault(_WiredWheel);

var _Utils = require("../../Utils");

var Utils = _interopRequireWildcard(_Utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntryWheel = function () {
  function EntryWheel() {
    _classCallCheck(this, EntryWheel);
  }

  _createClass(EntryWheel, [{
    key: "getPlateFromLetter",
    value: function getPlateFromLetter(letter) {
      return Utils.getIndex(letter);
    }
  }, {
    key: "getLetterFromPlate",
    value: function getLetterFromPlate(plate) {
      return Utils.getLetter(plate);
    }
  }]);

  return EntryWheel;
}();

exports.default = EntryWheel;
module.exports = exports["default"];