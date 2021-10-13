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
exports.processWorkRelationshipCreatedEvent = void 0;
const constants_1 = require("../../constants");
const abiMap = __importStar(require("../../blockchain/abi.json"));
const OpportunityService_1 = __importDefault(require("../../OpportunityService"));
const ethers_1 = require("ethers");
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
/**
 * WorkRelationshipCreated(address owner, address relationship, address market)
 * @param log
 * @returns
 */
function processWorkRelationshipCreatedEvent(log) {
    try {
        const iface = new ethers_1.ethers.utils.Interface(abiMap[constants_1.Contracts.MARKET]);
        const decodedLog = iface.parseLog(log);
        const { args, signature } = decodedLog;
        const relationshipOwner = args[0];
        const relationshipAddress = args[1];
        const relationshipMarketAddress = args[2];
        console.log('Processing ' + signature + ' with args: '
            + 'Owner: ' + relationshipOwner + ', Address: ' + relationshipAddress + ', and Market Address: ' + relationshipAddress);
        const relationshipContractInstance = new ethers_1.ethers.Contract(relationshipAddress, abiMap[constants_1.Contracts.WORK_RELATIONSHIP], OpportunityService_1.default.getSignersInterface());
        const relationshipTaskMetadataPointer = relationshipContractInstance._taskMetadataPointer();
        const relationshipStatus = 0; //relationshipContractInstance.get_contractStatus();
        const relationshipType = 0;
        //process contents of metadata pointer
        let relationshipMetadata = {}; //opportunityService.storageProvider.retrieveContent(relationshipTaskMetadataPointer);
        let relationshipData = {
            relationshipOwner,
            relationshipAddress,
            relationshipMarketAddress,
            relationshipStatus,
            relationshipMetadata,
            relationshipType
        };
        OpportunityEventEmitter_1.default.emit(constants_1.ExchangeEvents.WorkRelationshipCreated, relationshipData);
    }
    catch (error) {
        console.log(error);
    }
}
exports.processWorkRelationshipCreatedEvent = processWorkRelationshipCreatedEvent;
//# sourceMappingURL=processWorkRelationshipCreated.js.map