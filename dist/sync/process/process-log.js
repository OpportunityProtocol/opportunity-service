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
Object.defineProperty(exports, "__esModule", { value: true });
exports.processLogEvents = exports.processLog = void 0;
const constants_1 = require("../../constants");
const abiMap = __importStar(require("../../blockchain/abi.json"));
const processMarketCreatedLog_1 = require("./processMarketCreatedLog");
const processMarketDestroyedEvent_1 = require("./processMarketDestroyedEvent");
const ethers_1 = require("ethers");
const processWorkRelationshipCreated_1 = require("./processWorkRelationshipCreated");
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
    console.log(log);
    processLogEvents(log);
}
exports.processLog = processLog;
function processLogEvents(log) {
    let event = null;
    let hash = null;
    const { data, topics } = log;
    for (var i = 0; i < constants_1.ABI_LIST.length; i++) {
        var abis = abiMap[constants_1.ABI_LIST[i].toString()];
        for (const aItem in abis) {
            if (aItem['type'] == "event") {
                continue;
            }
            ;
            var signature = abis[aItem]['name'] + "(" + abis[aItem]['inputs'].map(function (input) { return input.type; }).join(",") + ")";
            console.log('Processing an event with the signature: ' + signature);
            hash = ethers_1.utils.id(signature);
            if (hash == topics[0]) {
                event = abis[aItem];
                break;
            }
        }
    }
    if (event != null) {
        switch (event['name']) {
            case "MarketCreated":
                (0, processMarketCreatedLog_1.processMarketCreatedEvent)(log);
                break;
            case "MarketDestroyed":
                (0, processMarketDestroyedEvent_1.processMarketDestroyedEvent)(log);
                break;
            case "WorkRelationshipCreated":
                (0, processWorkRelationshipCreated_1.processWorkRelationshipCreatedEvent)(log);
                break;
            default:
        }
    }
    else {
        console.log('Event is null.. exiting processing.');
    }
}
exports.processLogEvents = processLogEvents;
//# sourceMappingURL=process-log.js.map