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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncWithEthereumNode = void 0;
const addressMap = __importStar(require("../blockchain/addresses.json"));
const rpc_interface_1 = __importDefault(require("../rpc/interface/rpc-interface"));
const process_log_1 = require("../sync/process/process-log");
const constants_1 = require("../constants");
function syncWithEthereumNode() {
    return __awaiter(this, void 0, void 0, function* () {
        const highestBlockNumber = 0; //blockMap[Contracts.MARKET_FACTORY]; //get highest block number form db
        //sync Markets and Work Relationships
        yield rpc_interface_1.default.getLogs({ address: addressMap[constants_1.Contracts.MARKET_FACTORY], fromBlock: highestBlockNumber, toBlock: 'latest' }, (err, logs) => {
            console.log('Processing logs..');
            logs.forEach(log => {
                if (log && Array.isArray(log.topics) && log.topics.length) {
                    process_log_1.processLog(log); // keccashinside here
                }
            });
        });
    });
}
exports.syncWithEthereumNode = syncWithEthereumNode;
//# sourceMappingURL=sync-with-ethereum-node.js.map