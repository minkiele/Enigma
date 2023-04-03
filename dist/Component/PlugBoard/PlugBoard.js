"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});const Component_1=__importDefault(require("../Component")),utils_1=require("../../lib/utils");class PlugBoard extends Component_1.default{constructor(){super(...arguments),this.#t=[]}#t;plugWire(t,i){if((t=utils_1.normalizeInput(t))===(i=utils_1.normalizeInput(i)))throw"Cannot plug the same letter";for(let e=0;e<this.#t.length;e+=1){const[r,n]=this.#t[e];if(r===t||n===i||n===t||r===i)return!1}const e=[t,i];return this.#t.push(e),this.emit("change.wirePlugged",t,i),!0}unplugWire(t,i){t=utils_1.normalizeInput(t),i=utils_1.normalizeInput(i);for(let e=0;e<this.#t.length;e+=1){const[r,n]=this.#t[e];if(r===t&&n===i||n===t&&r===i)return this.#t.splice(e,1),this.emit("change.wireUnplugged",t,i),!0}return!1}plugWires(t){t.forEach((t=>{this.plugWire(t[0],t[1])}))}unplugAllWires(){this.#t.splice(0,this.#t.length)}getSwappedLetter(t){t=utils_1.normalizeInput(t);for(let i=0;i<this.#t.length;i+=1){const[e,r]=this.#t[i];if(e===t)return r;if(r===t)return e}return t}}exports.default=PlugBoard;
