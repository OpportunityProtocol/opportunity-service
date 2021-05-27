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
const rpc_interface_1 = __importDefault(require("../../rpc/interface/rpc-interface"));
const abiMap = __importStar(require("../../blockchain/abi.json"));
/**
 *
 * @param eventData
 * @returns
 */
function processMarketCreatedEvent(eventData) {
    //get market data
    const initialMarketData = eventData[1];
    const marketIndex = eventData[2];
    const marketAddress = eventData[3];
    const marketContractInstance = new rpc_interface_1.default.eth.Contract(abiMap[constants_1.Contracts.MARKET], marketAddress);
    //get a market's address and instantiate a new contract to get all work relationships
    let relationshipAddresses = [];
    relationshipAddresses = marketContractInstance.methods.getWorkRelationships().call();
    //update db for markets
    //update data db
    //go through the address of each relationship, create the contract and extract the status and metadata pointer;
    //update work db for work relationships
    for (const relationship in relationshipAddresses) {
        const relationshipContractInstance = new rpc_interface_1.default.eth.Contract(abiMap[constants_1.Contracts.WORK_RELATIONSHIP], relationship);
        const contractStatus = relationshipContractInstance.methods.get_contractStatus().call();
        const contractTaskName = relationshipContractInstance.methods.get_contractTaskName().call();
        //update db
    }
}
exports.processMarketCreatedEvent = processMarketCreatedEvent;
//# sourceMappingURL=processMarketCreatedLog.js.map