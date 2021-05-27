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
exports.processLogEvents = exports.processLog = void 0;
const constants_1 = require("../../constants");
const rpc_interface_1 = __importDefault(require("../../rpc/interface/rpc-interface"));
const abiMap = __importStar(require("../../blockchain/abi.json"));
const processMarketCreatedLog_1 = require("./processMarketCreatedLog");
const processMarketDestroyedEvent_1 = require("./processMarketDestroyedEvent");
/**
 * Retrieves topics and process the approppriate log
 * @param log
 *
 *   [{
 *   data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
 *   topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
 *   logIndex: 0,
 *   transactionIndex: 0,
 *   transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
 *   blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
 *   blockNumber: 1234,
 *   address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
 *   },{...}]
 */
function processLog(log) {
    processLogEvents(log);
}
exports.processLog = processLog;
function processLogEvents(log) {
    console.log('FOund a log to process');
    const topics = log.topics;
    let event = null;
    let abi = null;
    for (var i = 0; i < constants_1.ABI_LIST.length; i++) {
        var abis = abiMap[constants_1.Contracts[constants_1.ABI_LIST[i]]];
        for (const abiItem in abis) {
            if (abiItem.type != "event") {
                continue;
            }
            ;
            var signature = abiItem.name + "(" + abiItem.inputs.map(function (input) { return input.type; }).join(",") + ")";
            var hash = rpc_interface_1.default.eth.sha3(signature);
            if (hash == topics[0]) {
                event = abiItem;
                break;
            }
        }
    }
    if (event != null && abi != null) {
        var inputs = event.inputs.map(function (input) { return input.type; });
        let decodedEventData = rpc_interface_1.default.eth.abi.decodeParameters(inputs, abi);
        switch (decodedEventData[0]) {
            case "MarketCreated":
                processMarketCreatedLog_1.processMarketCreatedEvent(decodedEventData);
                break;
            case "MarketDestroyed":
                processMarketDestroyedEvent_1.processMarketDestroyedEvent(decodedEventData);
                break;
            default:
        }
    }
}
exports.processLogEvents = processLogEvents;
//# sourceMappingURL=process-log.js.map