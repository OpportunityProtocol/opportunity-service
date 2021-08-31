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
const ethers_1 = require("ethers");
const OpportunityService_1 = __importDefault(require("../../OpportunityService"));
const constants_1 = require("../../constants");
const addressMap = __importStar(require("../../blockchain/addresses.json"));
const abiMap = __importStar(require("../../blockchain/abi.json"));
function registerNewUser(universalAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Starting service api');
        console.log(OpportunityService_1.default.getSignersInterface());
        console.log(addressMap[constants_1.Contracts.USER_REGISTRATION]);
        console.log(abiMap[constants_1.Contracts.USER_REGISTRATION]);
        console.log('making call');
        const txResult = new ethers_1.Contract(addressMap[constants_1.Contracts.USER_REGISTRATION], abiMap[constants_1.Contracts.USER_REGISTRATION])
            .connect(OpportunityService_1.default.getSignersInterface())
            .functions
            .registerNewUser(universalAddress)
            .then(value => {
            console.log('1');
            console.log(value);
            return true;
        })
            .catch(error => {
            console.log('2');
            console.log(error);
            return false;
        });
    });
}
exports.default = registerNewUser;
//# sourceMappingURL=register-new-user.js.map