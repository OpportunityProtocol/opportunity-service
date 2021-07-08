"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = __importDefault(require("ethers"));
const constants_1 = require("../../constants");
const abi_json_1 = __importDefault(require("../../blockchain/abi.json"));
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
function processUserSummaryCreated(log) {
    try {
        const iface = new ethers_1.default.utils.Interface(abi_json_1.default[constants_1.Contracts.UserRegistration]);
        const decodedLog = iface.parseLog(log);
        const { args, signature } = decodedLog;
        const userSummaryContractAddress = args[0];
        const userRegistrationNumber = args[1];
        const registeredUniversalAddress = args[2];
        console.log('Processing: ' + 'processUserSummaryCreated event with args: ' + registeredUniversalAddress + ' and ' + userSummaryContractAddress);
        const userSummaryData = { userSummaryContractAddress, userRegistrationNumber, registeredUniversalAddress };
        OpportunityEventEmitter_1.default.emit(constants_1.UserEvents.UserSummaryCreated, userSummaryData);
        console.log('Successfgully processUserSummaryCreated');
    }
    catch (error) {
        console.log('processAssignedTrueIdentification: ' + error);
    }
}
exports.default = processUserSummaryCreated;
//# sourceMappingURL=processUserSummaryCreated.js.map