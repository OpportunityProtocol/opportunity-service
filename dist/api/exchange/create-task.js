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
const addressMap = __importStar(require("../../blockchain/addresses.json"));
const OpportunityService_1 = __importDefault(require("../../OpportunityService"));
const ethers_1 = require("ethers");
const Tx = require("ethereumjs-tx").Transaction;
function createTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('a');
        const parsedData = JSON.parse(data);
        const abi = abiMap[constants_1.Contracts.MARKET];
        console.log(abi);
        console.log(parsedData);
        const taskOwner = parsedData["taskOwner"];
        const taskMarket = parsedData["taskMarket"];
        const taskBounty = Number(parsedData["taskBounty"]);
        const taskMetadataPointer = parsedData["taskMetadataPointer"];
        console.log('b');
        console.log(taskOwner);
        console.log(taskMarket);
        console.log('h');
        console.log(taskBounty);
        console.log(taskMetadataPointer);
        if (taskOwner == null || taskMarket == 0 || taskBounty == 0 || taskMetadataPointer == '') {
            throw new Error('Null value in data');
        }
        console.log('C');
        try {
            console.log('d');
            const contract = yield new ethers_1.ethers.Contract(taskMarket, abi).connect(OpportunityService_1.default.getSignersInterface());
            console.log('e');
            const txResponse = yield contract.functions.createJob(taskOwner, constants_1.ContractType.NORMAL, taskMetadataPointer, taskBounty, addressMap[constants_1.Contracts.DAI]);
            const txReceipt = yield txResponse.wait();
            console.log(txReceipt);
        }
        catch (error) {
            console.log('Service: Caught error creating new job: ' + error);
        }
    });
}
exports.createTask = createTask;
//# sourceMappingURL=create-task.js.map