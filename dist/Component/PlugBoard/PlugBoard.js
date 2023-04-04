Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=r(require("../Component")),i=require("../../lib/utils"),t=r(require("./Wire/PlugBoardWire"));function r(e){return e&&e.__esModule?e:{default:e}}class n extends e.default{#e=[];plugWire(e,r,n=new t.default(e,r)){if((e=(0,i.normalizeInput)(e))===(r=(0,i.normalizeInput)(r)))throw"Cannot plug the same letter";for(let i=0;i<this.#e.length;i+=1){const[t,n]=this.#e[i];if(t===e||n===r||n===e||t===r)return!1}const s=[e,r,n];return this.#e.push(s),this.emit("change.wirePlugged",e,r),!0}unplugWire(e,t){e=(0,i.normalizeInput)(e),t=(0,i.normalizeInput)(t);for(let i=0;i<this.#e.length;i+=1){const[r,n]=this.#e[i];if(r===e&&n===t||n===e&&r===t)return this.#e.splice(i,1),this.emit("change.wireUnplugged",e,t),!0}return!1}plugWires(e){e.forEach((e=>{this.plugWire(e[0],e[1],e[2])}))}unplugAllWires(){this.#e.splice(0,this.#e.length)}getSwappedLetter(e){e=(0,i.normalizeInput)(e);for(let i=0;i<this.#e.length;i+=1){const[t,r,n]=this.#e[i];if(t===e||r===e)return n.encode(e)}return e}}exports.default=n;
