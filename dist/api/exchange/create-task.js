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
const abiMap = __importStar(require("../../blockchain/abi.json"));
const bytecodeMap = __importStar(require("../../blockchain/bytecode.json"));
const OpportunityService_1 = __importDefault(require("../../OpportunityService"));
const ethers_1 = __importDefault(require("ethers"));
const OpportunityStorageProvider_1 = __importDefault(require("../../modules/storage/OpportunityStorageProvider"));
const Tx = require("ethereumjs-tx").Transaction;
function createTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const abi = abiMap[constants_1.Contracts.WORK_RELATIONSHIP];
        const bytecode = bytecodeMap[constants_1.Contracts.WORK_RELATIONSHIP];
        const { taskOwner } = data;
        const overrides = {
            from: taskOwner
        };
        const taskAddressPointer = yield OpportunityStorageProvider_1.default.storeContent(data);
        const contractFactory = new ethers_1.default.ContractFactory(abi, bytecode, OpportunityService_1.default.getSignersInterface());
        const contract = yield contractFactory.deploy(taskAddressPointer, overrides);
        contract.deployTransaction.wait()
            .then(receipt => {
            const parsedData = JSON.parse(data);
            //create task object
            const relationshipData = Object.assign(Object.assign({}, parsedData), { taskBlockNumber: receipt.blockNumber, taskContractAddress: receipt.contractAddress, taskTransactionHash: receipt.transactionHash });
            //unfortunately here we need to stringy the data, read from ipfs, and store again, but this
            //is a design problem that will be fixed before testnet release to avoid excessive
            //gas cost
            const updatedContent = JSON.stringify(relationshipData);
            //read data from ipfs
            //update in ipfs
            //update contract address pointer
            //update requester general task description
        })
            .catch(error => {
            console.log('Error deploying new work relationship.');
        });
    });
}
exports.createTask = createTask;
//# sourceMappingURL=create-task.js.map