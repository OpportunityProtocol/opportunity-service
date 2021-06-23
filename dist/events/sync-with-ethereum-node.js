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
exports.syncWithEthereumNode = void 0;
const sync_markets_1 = __importDefault(require("../sync/sync-markets"));
const sync_jobs_1 = __importDefault(require("../sync/sync-jobs"));
function syncWithEthereumNode() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Syncing with ethereum node..');
        const highestBlockNumber = 1; //blockMap[Contracts.MARKET_FACTORY]; //get highest block number form db
        sync_markets_1.default();
        sync_jobs_1.default('0x2b18f84Fe03C4FdC808A7ffd0E4F8FD1a8c846c2');
    });
}
exports.syncWithEthereumNode = syncWithEthereumNode;
//# sourceMappingURL=sync-with-ethereum-node.js.map