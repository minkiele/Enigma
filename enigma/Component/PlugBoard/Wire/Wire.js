Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,t=require("../../../lib/utils"),r=(e=require("../../Component"))&&e.__esModule?e:{default:e};class s extends r.default{constructor(e,r){if(super(),this.firstLetter=(0,t.normalizeInput)(e),this.secondLetter=(0,t.normalizeInput)(r),this.firstLetter===this.secondLetter)throw new Error("Plugging the same letter")}}exports.default=s;