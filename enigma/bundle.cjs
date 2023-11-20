"use strict";class t{}const e="A".charCodeAt(0);function r(t,r=0){return t.charCodeAt(r)-e}function i(t){return String.fromCharCode(t+e)}function s(t,e){return i(h(r(t)+e))}function o(t){return s(t,1)}function n(t){return s(t,8)}function h(t,e=26){return(e+t)%e}const g=/^[A-Z]$/;function a(t){return g.test(t)}function c(t){const e=`${t}`.toUpperCase();if(a(e))return e.charAt(0);throw"Input cannot be normalized"}var l=Object.freeze({__proto__:null,getIndex:r,getLetter:i,getModularNumber:h,getNextLetter:o,getNotchLetter:n,getShiftedLetter:s,isUpperCaseLetter:a,normalizeInput:c});class u extends t{pinToPin(t){return r(this.wirings,t)}getReflectedLetter(t){const e=r(t.toUpperCase());return i(this.pinToPin(e))}}class d extends u{}class p extends t{constructor(){super(),this.setRingPosition(0)}pinToPlate(t){return r(this.wirings,t)}plateToPin(t){return this.wirings.indexOf(i(t))}setRingPosition(t){this.ringPosition=t}setRingSetting(t){this.setRingPosition(r(t))}getOutputLetter(t){const e=h(r(t.toUpperCase())-this.ringPosition);return i(h(this.pinToPlate(e)+this.ringPosition))}getInputLetter(t){const e=h(r(t.toUpperCase())+this.ringPosition);return i(h(this.plateToPin(e)-this.ringPosition))}}class R extends p{}class f{constructor(t,e){if(this.firstLetter=c(t),this.secondLetter=c(e),this.firstLetter===this.secondLetter)throw new Error("Plugging the same letter")}}class w extends f{swap(t){return t===this.firstLetter?this.secondLetter:t===this.secondLetter?this.firstLetter:void 0}swapForward=this.swap.bind(this);swapBackward=this.swap.bind(this)}class P{static DIRECTION_FORWARD="F";static DIRECTION_BACKWARDS="B";#t=[];plugWire(t,e){if(t instanceof f&&null==e){for(let e=0;e<this.#t.length;e+=1){const{firstLetter:r,secondLetter:i}=this.#t[e];if(r===t.firstLetter||i===t.secondLetter||i===t.firstLetter||r===t.secondLetter)return!1}return this.#t.push(t),!0}return"string"==typeof t&&"string"==typeof e&&this.plugWire(new w(t,e))}unplugWire(t,e){if(t instanceof f&&null==e)for(let e=0;e<this.#t.length;e+=1){const{firstLetter:r,secondLetter:i}=this.#t[e];if(r===t.firstLetter&&i===t.secondLetter||i===t.firstLetter&&r===t.secondLetter)return this.#t.splice(e,1),!0}else if("string"==typeof t&&"string"==typeof e)return this.unplugWire(new w(t,e));return!1}plugWires(t){t.forEach((t=>{t instanceof Array?this.plugWire(t[0],t[1]):t instanceof f&&this.plugWire(t)}))}unplugAllWires(){this.#t.splice(0,this.#t.length)}getSwappedLetter(t,e){t=c(t);for(let r=0;r<this.#t.length;r+=1){const i="F"===e?this.#t[r].swapForward(t):this.#t[r].swapBackward(t);if(null!=i)return i}return t}}const W=[6,31,4,29,18,39,16,25,30,23,28,1,38,11,36,37,26,27,24,21,14,3,12,17,2,7,0,33,10,35,8,5,22,19,20,13,34,15,32,9],I=[6,0,7,5,1,8,4,2,9,3];class L extends t{getPlateFromLetter(t){return r(t)}getLetterFromPlate(t){return i(t)}}const x="L",O="C",T="R";class C{plugBoard=new P;entryWheel=new L;rotors={};rotorsWindowLetter={};constructor(){this.setRotor(null,x),this.setRotor(null,O),this.setRotor(null,T)}getPlugBoard(){return this.plugBoard}setRotor(t,e){return this.rotors[e]=t,this.setRotorWindowLetter("A",e),this}getRotor(t){return this.rotors[t]}setReflector(t){return this.reflector=t,this}setRotorWindowLetter(t,e){return this.rotorsWindowLetter[e]=t,this}getRotorWindowLetter(t){return this.rotorsWindowLetter[t]}isRotorInNotchPosition(t){const e=n(this.getRotorWindowLetter(t));return this.getRotor(t).notchPosition.indexOf(e)>-1}advanceRotor(t){return this.setRotorWindowLetter(o(this.getRotorWindowLetter(t)),t),this}advanceRotors(){const t=this.isRotorInNotchPosition(O),e=this.isRotorInNotchPosition(T);return t&&this.advanceRotor(x),(t||e)&&this.advanceRotor(O),this.advanceRotor(T),this}encodeForward(t){const e=t.toUpperCase(),r=this.plugBoard.getSwappedLetter(e,P.DIRECTION_FORWARD),i=this.entryWheel.getPlateFromLetter(r),s=this.getRotorInputPosition(i,T),o=this.getRotor(T).pinToPlate(s),n=this.getRotorOutputPosition(o,T),h=this.getRotorInputPosition(n,O),g=this.getRotor(O).pinToPlate(h),a=this.getRotorOutputPosition(g,O),c=this.getRotorInputPosition(a,x),l=this.getRotor(x).pinToPlate(c);return this.getRotorOutputPosition(l,x)}encodeReflect(t){return this.reflector.pinToPin(t)}encodeBackwards(t){const e=this.getRotorInputPosition(t,x),r=this.getRotor(x).plateToPin(e),i=this.getRotorOutputPosition(r,x),s=this.getRotorInputPosition(i,O),o=this.getRotor(O).plateToPin(s),n=this.getRotorOutputPosition(o,O),h=this.getRotorInputPosition(n,T),g=this.getRotor(T).plateToPin(h),a=this.getRotorOutputPosition(g,T),c=this.entryWheel.getLetterFromPlate(a);return this.plugBoard.getSwappedLetter(c,P.DIRECTION_BACKWARDS)}getEncodedLetter(t){if(!this.isMachineValidState())throw"Machine is not in valid state";this.advanceRotors();const e=this.encodeForward(t),r=this.encodeReflect(e);return this.encodeBackwards(r)}getRotorInputPosition(t,e){return h(t+r(this.getRotorWindowLetter(e))-this.getRotor(e).ringPosition)}getRotorOutputPosition(t,e){return h(t-r(this.getRotorWindowLetter(e))+this.getRotor(e).ringPosition)}encode(t){let e="";for(let r=0;r<t.length;r+=1)e+=this.getEncodedLetter(t.charAt(r));return e}isMachineValidState(){return this.getRotor(x)instanceof p&&this.getRotor(O)instanceof p&&this.getRotor(T)instanceof p&&this.reflector instanceof u}static LEFT_ROTOR=x;static CENTER_ROTOR=O;static RIGHT_ROTOR=T}const F="F";exports.Enigma=C,exports.EnigmaM4=class extends C{constructor(){super(),this.setRotor(null,F)}encodeForward(t){const e=super.encodeForward(t);if(this.isClassicConfiguration())return e;{const t=this.getRotorInputPosition(e,F),r=this.getRotor(F).pinToPlate(t);return this.getRotorOutputPosition(r,F)}}encodeBackwards(t){let e;if(this.isClassicConfiguration())e=t;else{const r=this.getRotorInputPosition(t,F),i=this.getRotor(F).plateToPin(r);e=this.getRotorOutputPosition(i,F)}return super.encodeBackwards(e)}isClassicConfiguration(){return null===this.getRotor(F)&&this.reflector instanceof u&&!(this.reflector instanceof d)}isMachineValidState(){const t=super.isMachineValidState();return this.isClassicConfiguration()?t:t&&this.getRotor(F)instanceof R&&this.reflector instanceof d}static FOURTH_ROTOR=F},exports.PlugBoard=P,exports.PlugBoardWire=w,exports.ReflectorA=class extends u{wirings="EJMZALYXVBWFCRQUONTSPIKHGD"},exports.ReflectorB=class extends u{wirings="YRUHQSLDPXNGOKMIEBFZCWVJAT"},exports.ReflectorBeta=class extends u{wirings="LEYJVCNIXWPBQMDRTAKZGFUHOS"},exports.ReflectorC=class extends u{wirings="FVPJIAOYEDRZXWGCTKUQSBNMHL"},exports.ReflectorD=class extends u{#e=[[0,13]];plugWire(t,e){if(this.#e.length>=13)throw"All plugs have been wired";if(!this.arePlugsWireable(t,e))throw"This couple is permanently wired and therefore cannot be plugged";if(t===e)throw"Cannot wire the same letter";if(!(t>=0&&t<26&&e>=0&&e<26))throw"Wiring indexes out of bounds";for(let r=0;r<this.#e.length;r+=1){const[i,s]=this.#e[r];if(i===t||s===t||i===e||s===e)throw"At least one of the plugs is already wired"}this.#e.push([t,e])}arePlugsWireable(t,e){return!(0===t&&13===e||13===t&&0===e)}unplugWire(t,e){if(!this.arePlugsWireable(t,e))throw"This couple is permanently wired and therefore cannot be unplugged";for(let r=0;r<this.#e.length;r+=1){const[i,s]=this.#e[r];(i===t&&s===e||i===e&&s===t)&&this.#e.splice(r,1)}}pinToPin(t){for(let e=0;e<this.#e.length;e+=1){const[r,i]=this.#e[e];if(r===t)return i;if(i===t)return r}throw"This pin is not wired"}getReflectedLetter(){throw"This method has various interpretations on this reflector"}getIndexFromGermanNotation(t){let e=r(t);if(9===e||24===e)throw"J and Y letters do not appear in German notation";return(e>8&&e<13||25===e)&&(e-=1),25-e}getIndexFromAlliedNotation(t){return h(r(t)+25)}plugWireInGermanNotation(t,e){this.plugWire(this.getIndexFromGermanNotation(t),this.getIndexFromGermanNotation(e))}unplugWireInGermanNotation(t,e){this.unplugWire(this.getIndexFromGermanNotation(t),this.getIndexFromGermanNotation(e))}plugWireInAlliedNotation(t,e){this.plugWire(this.getIndexFromAlliedNotation(t),this.getIndexFromAlliedNotation(e))}unplugWireInAlliedNotation(t,e){this.unplugWire(this.getIndexFromAlliedNotation(t),this.getIndexFromAlliedNotation(e))}},exports.ReflectorGamma=class extends u{wirings="FSOKANUERHMBTIYCWLQPZXVGJD"},exports.RotorI=class extends p{wirings="EKMFLGDQVZNTOWYHXUSPAIBRCJ";notchPosition="Y"},exports.RotorII=class extends p{wirings="AJDKSIRUXBLHWTMCQGZNPYFVOE";notchPosition="M"},exports.RotorIII=class extends p{wirings="BDFHJLCPRTXVZNYEIWGAKMUSQO";notchPosition="D"},exports.RotorIV=class extends p{wirings="ESOVPZJAYQUIRHXLNFTGKDCMWB";notchPosition="R"},exports.RotorV=class extends p{wirings="VZBRGITYUPSDNHLXAWMJQOFECK";notchPosition="H"},exports.RotorVI=class extends p{wirings="JPGVOUMFYQBENHZRDKASXLICTW";notchPosition="HU"},exports.RotorVII=class extends p{wirings="NZJHGRCXMYSWBOUFAIVLPEKQDT";notchPosition="HU"},exports.RotorVIII=class extends p{wirings="FKQHTLXOCBJSPDZRAMEWNIUYGV";notchPosition="HU"},exports.ThinReflectorB=class extends d{wirings="ENKQAUYWJICOPBLMDXZVFTHRGS"},exports.ThinReflectorC=class extends d{wirings="RDOBJNTKVEHMLFCWZAXGYIPSUQ"},exports.ThinRotorBeta=class extends R{wirings="LEYJVCNIXWPBQMDRTAKZGFUHOS"},exports.ThinRotorGamma=class extends R{wirings="FSOKANUERHMBTIYCWLQPZXVGJD"},exports.Uhr=class{#r={};#i=0;setUhrSetting(t){this.#i=h(t,W.length)}getUhrSetting(){return this.#i}getInnerPin(t){return h(W[h(t+this.#i,W.length)]-this.#i,W.length)}getOuterPin(t){const e=h(t+this.#i,W.length);return h(W.indexOf(e)-this.#i,W.length)}getIngoingBlackWire(t){const e=4*(t-1),r=this.getInnerPin(e);return I[(r-2)/4]+1}getOutgoingBlackWire(t){const e=4*(t-1)+2,r=this.getInnerPin(e);return I[r/4]+1}getIngoingRedWire(t){const e=4*I.indexOf(t-1);return(this.getOuterPin(e)-2)/4+1}getOutgoingRedWire(t){const e=4*I.indexOf(t-1)+2;return this.getOuterPin(e)/4+1}getUhrWire(t){return this.#r[t]}getUhrWires(){return Object.keys(this.#r).sort(((t,e)=>Number(e)-Number(t))).map((t=>this.#r[t]))}prepareUhrWire(t,e,r){const i=this,s=new class extends f{swapForward(e){return e===this.firstLetter?i.#r[i.getIngoingBlackWire(t)].secondLetter:e===this.secondLetter?i.#r[i.getIngoingRedWire(t)].firstLetter:void 0}swapBackward(e){return e===this.firstLetter?i.#r[i.getOutgoingBlackWire(t)].secondLetter:e===this.secondLetter?i.#r[i.getOutgoingRedWire(t)].firstLetter:void 0}}(e,r);return this.#r[t]=s,s}prepareUhrWires(t){t.forEach((([t,e],r)=>{this.prepareUhrWire(r+1,t,e)}))}},exports.Utils=l;