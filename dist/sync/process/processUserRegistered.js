"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = __importDefault(require("ethers"));
const constants_1 = require("../../constants");
const abi_json_1 = __importDefault(require("../../blockchain/abi.json"));
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
function processUserRegistered(log) {
    try {
        const iface = new ethers_1.default.utils.Interface(abi_json_1.default[constants_1.Contracts.USER_REGISTRATION]);
        const decodedLog = iface.parseLog(log);
        const { args, signature } = decodedLog;
        const registeredUniversalAddress = args[0];
        console.log('Processing: ' + 'UserRegistered event with args: ' + registeredUniversalAddress);
        console.log('Successfully processedUserRegistered');
        OpportunityEventEmitter_1.default.emit(constants_1.UserEvents.UserRegistered, registeredUniversalAddress);
    }
    catch (error) {
        console.log('processUserRegistered: ' + error);
    }
}
exports.default = processUserRegistered;
//# sourceMappingURL=processUserRegistered.js.map