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
const createClient = require('ipfs-http-client');
const OpportunityEventEmitter_1 = __importDefault(require("../../events/OpportunityEventEmitter"));
const constants_1 = require("../../constants");
let client;
function createNewClient(url = 'http://localhost:5001/api/v0' /*process.env.DEFAULT_IPFS_URL*/) {
    client = createClient(new URL(url));
    OpportunityEventEmitter_1.default.emit(constants_1.StorageEvents.HOST_CHANGED, url);
}
function addData(data) {
    const { cid } = this.client.add(data);
    OpportunityEventEmitter_1.default.emit(constants_1.StorageEvents.DATA_ADDED);
    return cid;
}
function getData(cid) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const decoder = new TextDecoder();
        let content = '';
        try {
            for (var _b = __asyncValues(this.client.cat(cid)), _c; _c = yield _b.next(), !_c.done;) {
                const chunk = _c.value;
                content += decoder.decode(chunk);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        OpportunityEventEmitter_1.default.emit(constants_1.StorageEvents.DATA_RETRIEVED);
        return content;
    });
}
const IPFSProviderInterface = {
    createProvider: createNewClient,
    storeData: addData,
    retrieveData: getData
};
exports.default = IPFSProviderInterface;
//# sourceMappingURL=ipfs-operations.js.map