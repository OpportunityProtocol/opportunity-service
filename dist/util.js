"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveBytecode = exports.decodeHexToAscii = exports.encodeAsciiToHex = void 0;
function encodeAsciiToHex(rpc, ascii) {
    return rpc.utils.asciiToHex(ascii);
}
exports.encodeAsciiToHex = encodeAsciiToHex;
function decodeHexToAscii(rpc, hex) {
    return rpc.utils.hexToAcii(hex);
}
exports.decodeHexToAscii = decodeHexToAscii;
function retrieveBytecode(address, ethrpc) {
    return __awaiter(this, void 0, void 0, function* () {
        return ethrpc.eth.getCode(address).then((err, result) => {
            return result;
        });
    });
}
exports.retrieveBytecode = retrieveBytecode;
//# sourceMappingURL=util.js.map