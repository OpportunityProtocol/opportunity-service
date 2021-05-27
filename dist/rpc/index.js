"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectRpc = exports.connectRpc = exports.rpc = void 0;
const rpc_interface_1 = __importDefault(require("./interface/rpc-interface"));
exports.rpc = rpc_interface_1.default;
const connection_1 = require("./connection");
Object.defineProperty(exports, "connectRpc", { enumerable: true, get: function () { return connection_1.connectRpc; } });
Object.defineProperty(exports, "disconnectRpc", { enumerable: true, get: function () { return connection_1.disconnectRpc; } });
//# sourceMappingURL=index.js.map