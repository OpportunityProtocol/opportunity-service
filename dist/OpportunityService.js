"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const OpportunityEventEmitter_1 = __importDefault(require("./events/OpportunityEventEmitter"));
const sync_with_ethereum_node_1 = require("./events/sync-with-ethereum-node");
const index_1 = require("./rpc/index");
const rpc_interface_1 = __importDefault(require("./rpc/interface/rpc-interface"));
const abi_json_1 = __importDefault(require("./blockchain/abi.json"));
const addresses_json_1 = __importDefault(require("./blockchain/addresses.json"));
const blocks_json_1 = __importDefault(require("./blockchain/blocks.json"));
class OpportunityService {
    constructor() {
        //logger = null;
        this.eventEmitter = OpportunityEventEmitter_1.default;
        this.running = false;
        this.rpc = rpc_interface_1.default;
        this.running = false;
    }
    startService() {
        if (this.running) {
            return;
        }
        index_1.connectRpc(this.rpc);
        //sync node
        this.syncing = true;
        this.eventEmitter.emit(constants_1.RPCEvents.StartSyncing);
        sync_with_ethereum_node_1.syncWithEthereumNode()
            .then(() => {
            this.syncing = false;
            this.eventEmitter.emit(constants_1.RPCEvents.StopSyncing);
        })
            .catch(err => {
            console.log(err);
        });
        this.running = true;
        this.eventEmitter.emit(constants_1.ServiceEvents.ServiceStarted);
    }
    shutdownService() {
        if (!this.running) {
            return;
        }
        ;
        this.running = false;
        this.eventEmitter.emit(constants_1.ServiceEvents.ServiceStopped);
    }
    isSyncing() {
        return this.syncing;
    }
    accessContractUploadBlock(contract) {
        return blocks_json_1.default[contract];
    }
    accessContractAddress(contract) {
        return addresses_json_1.default[contract];
    }
    accessContractABI(contract) {
        return abi_json_1.default[contract];
    }
}
const opportunityService = new OpportunityService();
exports.default = opportunityService;
//# sourceMappingURL=OpportunityService.js.map