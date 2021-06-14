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
exports.createTask = void 0;
const constants_1 = require("../../constants");
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
const abiMap = __importStar(require("../../blockchain/abi.json"));
const bytecodeMap = __importStar(require("../../blockchain/bytecode.json"));
const OpportunityService_1 = __importDefault(require("../../OpportunityService"));
const ethers_1 = require("ethers");
const Tx = require("ethereumjs-tx").Transaction;
function createTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const abi = abiMap[constants_1.Contracts.WORK_RELATIONSHIP];
        const bytecode = bytecodeMap[constants_1.Contracts.WORK_RELATIONSHIP];
        const { taskOwner, taskMarket } = data;
        const taskMetadataPointer = ''; //await opportunityStorageProvider.storeContent(data);
        const contractFactory = new ethers_1.ethers.ContractFactory(abi, bytecode, OpportunityService_1.default.getSignersInterface());
        const contract = yield contractFactory.deploy('0x9f72317A51728672eBca24c673c9F54ddCe1eD29', taskMetadataPointer);
        contract.deployTransaction.wait()
            .then(receipt => {
            //TODO: update requester general task description
            const parsedData = Object.assign(Object.assign({}, data), { taskMetadataPointer });
            OpportunityEventEmitter_1.default.emit(constants_1.ExchangeEvents.WorkRelationshipCreated, parsedData);
            console.log('Successfully');
        })
            .catch(error => {
            console.log('Error deploying new work relationship with error: ' + error);
        });
    });
}
exports.createTask = createTask;
//# sourceMappingURL=create-task.js.map