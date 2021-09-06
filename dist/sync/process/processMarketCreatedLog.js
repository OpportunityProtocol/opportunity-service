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
exports.processMarketCreatedEvent = void 0;
const constants_1 = require("../../constants");
const abiMap = __importStar(require("../../blockchain/abi.json"));
const OpportunityService_1 = __importDefault(require("../../OpportunityService"));
const ethers_1 = require("ethers");
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
/**
 * MarketCreated(_market: address, index: uint256, _marketAddress: address, owner: address)
 * @param eventData
 * @returns
 */
function processMarketCreatedEvent(log) {
    const iface = new ethers_1.ethers.utils.Interface(abiMap[constants_1.Contracts.MARKET_FACTORY]);
    const decodedLog = iface.parseLog(log);
    const { args, signature } = decodedLog;
    const marketAddress = args[0];
    const marketIndex = args[1];
    const marketOwner = args[2];
    const marketName = args[3];
    const marketType = args[4];
    console.log('Processing ' + signature + ' with args: '
        + 'Market Address: ' + marketAddress + ', Index: '
        + marketIndex + ', Owner: ' + marketOwner, ', Market Name: ' + marketName, +', and Market Type: ' + marketType);
    const marketContractInstance = new ethers_1.ethers.Contract(marketAddress, abiMap[constants_1.Contracts.MARKET], OpportunityService_1.default.getProviderInterface());
    let marketData = {
        marketAddress,
        marketIndex,
        marketOwner,
        marketName,
        marketType,
        marketRelationshipData: []
    };
    OpportunityEventEmitter_1.default.emit(constants_1.MarketEvents.MarkedCreated, marketData);
}
exports.processMarketCreatedEvent = processMarketCreatedEvent;
//# sourceMappingURL=processMarketCreatedLog.js.map