Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e,t=(e=require("./Wire"))&&e.__esModule?e:{default:e};class s extends t.default{swap(e){return e===this.firstLetter?this.secondLetter:e===this.secondLetter?this.firstLetter:void 0}swapForward=this.swap.bind(this);swapBackward=this.swap.bind(this)}exports.default=s;
