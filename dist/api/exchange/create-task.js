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
            const txResponse = yield contract.functions.createJob(taskOwner, constants_1.ContractType.NORMAL, taskMetadataPointer, addressMap['Dai'], addressMap['cDai'], addressMap['Banker']);
            const txReceipt = yield txResponse.wait();
            console.log(txReceipt);
        }
        catch (error) {
            console.log('Service: Caught error creating new job: ' + error);
        }
    });
}
exports.createTask = createTask;
/*

blockHash: "0xa923c23eec29567d8c2a84c85efbf852d8843448e6452ace4296142a5bf172c4"
blockNumber: 546
byzantium: true
confirmations: 1
contractAddress: null
cumulativeGasUsed: BigNumber {_hex: '0x1905c4', _isBigNumber: true}
events: [{…}]
from: "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1"
gasUsed: BigNumber {_hex: '0x1905c4', _isBigNumber: true}
logs: [{…}]
logsBloom: "0x00000000000000000000000000000000000008000000000000000000000000000000008004000000000000000000000000000000000000001080000020000000000000000000000000000000008000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000010000000040000000000000000000000000000000000000000000000000000080000008000800000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000"
status: 1
to: "0xF1fE363e6A32F91F52D55dCa56daFb1C88f9Dc2C"
transactionHash: "0x70f1f60a6a5056374cad6480dc1137be3a953d4ef724dac1190076305291096a"
transactionIndex: 0

*/ 
//# sourceMappingURL=create-task.js.map