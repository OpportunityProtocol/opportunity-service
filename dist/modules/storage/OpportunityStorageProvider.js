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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
    storeRawContent(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedContent = JSON.stringify(content);
            const cid = yield this.ipfsProvider.add(parsedContent);
            console.log('Storage Provider: ' + 'Storing raw content with cid: ' + cid);
        });
    }
    retrieveContent(cid) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.ipfsProvider.get(cid);
            console.log(file.type, file.path);
            if (!file.content)
                return -1;
            const content = [];
            try {
                for (var _b = __asyncValues(file.content), _c; _c = yield _b.next(), !_c.done;) {
                    const chunk = _c.value;
                    content.push(chunk);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.log('Returning content from storage provider: ' + content);
        });
    }
}
const opportunityStorageProvider = new OpportunityStorageProvider();
exports.default = opportunityStorageProvider;
//# sourceMappingURL=OpportunityStorageProvider.js.map