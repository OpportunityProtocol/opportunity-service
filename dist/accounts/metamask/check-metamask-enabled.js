"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMetamaskEnabled = void 0;
const web3_1 = __importDefault(require("web3"));
function isMetamaskEnabled() {
    if (window.web3) {
        window.web3 = new web3_1.default(window.web3.currentProvider);
        window.ethereum.enable();
        return true;
    }
    return false;
}
exports.isMetamaskEnabled = isMetamaskEnabled;
//# sourceMappingURL=check-metamask-enabled.js.map