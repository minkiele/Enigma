Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,t=(e=require("../../WiredWheel/WiredWheel"))&&e.__esModule?e:{default:e},i=require("../../../lib/utils");class r extends t.default{constructor(){super(),this.setRingPosition(0)}pinToPlate(e){return(0,i.getIndex)(this.wirings,e)}plateToPin(e){return this.wirings.indexOf((0,i.getLetter)(e))}setRingPosition(e){this.ringPosition=e}setRingSetting(e){this.setRingPosition((0,i.getIndex)(e))}getOutputLetter(e){const t=e.toUpperCase(),r=(0,i.getIndex)(t),s=(0,i.getModularNumber)(r-this.ringPosition),n=this.pinToPlate(s),o=(0,i.getModularNumber)(n+this.ringPosition);return(0,i.getLetter)(o)}getInputLetter(e){const t=e.toUpperCase(),r=(0,i.getIndex)(t),s=(0,i.getModularNumber)(r+this.ringPosition),n=this.plateToPin(s),o=(0,i.getModularNumber)(n-this.ringPosition);return(0,i.getLetter)(o)}}exports.default=r;
