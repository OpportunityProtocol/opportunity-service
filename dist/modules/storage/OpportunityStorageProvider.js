"use strict";
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
const ipfs_core_1 = __importDefault(require("ipfs-core"));
class OpportunityStorageProvider {
    constructor() {
        this.ipfsProvider = null;
        this.ipfsProvider = ipfs_core_1.default.create();
    }
    storeContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cid } = yield this.ipfsProvider.add(content);
            return cid;
        });
    }
    retrieveContent(cid) {
        return this.ipfsProvider.get(cid);
    }
}
const opportunityStorageProvider = new OpportunityStorageProvider();
exports.default = opportunityStorageProvider;
//# sourceMappingURL=OpportunityStorageProvider.js.map