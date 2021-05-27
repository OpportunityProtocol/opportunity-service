"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectRpc = exports.connectRpc = void 0;
const constants_1 = require("../constants");
function connectRpc(ethrpc) {
    ethrpc.connect(constants_1.RPC_CONFIGURATION, function (err) {
        if (err) {
            console.error("Failed to connect to Ethereum node.");
        }
        else {
            console.log("Connected to Ethereum node.");
        }
    });
}
exports.connectRpc = connectRpc;
function disconnectRpc(ethrpc) {
    ethrpc.disconnect();
}
exports.disconnectRpc = disconnectRpc;
//# sourceMappingURL=connection.js.map