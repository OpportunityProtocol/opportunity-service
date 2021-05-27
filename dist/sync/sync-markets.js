"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rpc_interface_1 = __importDefault(require("../rpc/interface/rpc-interface"));
const addressMap = __importStar(require("../blockchain/addresses.json"));
const constants_1 = require("../constants");
const process_log_1 = require("./process/process-log");
function syncMarkets() {
    //sync Markets and Work Relationships
    rpc_interface_1.default.getLogs({ address: addressMap[constants_1.Contracts.MARKET_FACTORY], fromBlock: 0, toBlock: 'latest' }, (err, logs) => {
        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                process_log_1.processLog(log);
            }
        });
    });
}
module.exports = syncMarkets;
//# sourceMappingURL=sync-markets.js.map