"use strict";var __importDefault=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});const Enigma_1=__importDefault(require("./Enigma")),ThinRotor_1=__importDefault(require("../Component/WiredWheel/Rotor/ThinRotor/ThinRotor")),Reflector_1=__importDefault(require("../Component/WiredWheel/Reflector/Reflector")),ThinReflector_1=__importDefault(require("../Component/WiredWheel/Reflector/ThinReflector/ThinReflector")),FOURTH_ROTOR="F";class EnigmaM4 extends Enigma_1.default{constructor(){super(),this.setRotor(null,"F")}encodeForward(t){const e=super.encodeForward(t);if(this.isClassicConfiguration())return e;{const t=this.getRotorInputPosition(e,"F"),o=this.getRotor("F").pinToPlate(t);return this.getRotorOutputPosition(o,"F")}}encodeBackwards(t){let e;if(this.isClassicConfiguration())e=t;else{const o=this.getRotorInputPosition(t,"F"),i=this.getRotor("F").plateToPin(o);e=this.getRotorOutputPosition(i,"F")}return super.encodeBackwards(e)}isClassicConfiguration(){return null===this.getRotor("F")&&this.reflector instanceof Reflector_1.default&&!(this.reflector instanceof ThinReflector_1.default)}isMachineValidState(){const t=super.isMachineValidState();return this.isClassicConfiguration()?t:t&&this.getRotor("F")instanceof ThinRotor_1.default&&this.reflector instanceof ThinReflector_1.default}}exports.default=EnigmaM4,EnigmaM4.FOURTH_ROTOR="F";
