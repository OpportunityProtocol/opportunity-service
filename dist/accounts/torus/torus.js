"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.torus = void 0;
const torus_embed_1 = __importDefault(require("@toruslabs/torus-embed"));
const torus = new torus_embed_1.default({});
exports.torus = torus;
torus.init({
    enableLogging: true,
    network: { host: 'localhost' },
    showTorusButton: false
});
//# sourceMappingURL=torus.js.map