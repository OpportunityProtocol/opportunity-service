"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const OpportunityEventEmitter_1 = __importDefault(require("./events/OpportunityEventEmitter"));
const sync_with_ethereum_node_1 = require("./events/sync-with-ethereum-node");
const abi_json_1 = __importDefault(require("./blockchain/abi.json"));
const addresses_json_1 = __importDefault(require("./blockchain/addresses.json"));
const blocks_json_1 = __importDefault(require("./blockchain/blocks.json"));
const start_event_listeners_1 = require("./events/start-event-listeners");
class OpportunityService {
    constructor() {
        //logger = null;
        this.eventEmitter = OpportunityEventEmitter_1.default;
        this.running = false;
        this.ethersProvider = null;
        this.ethersSigner = null;
        this.defaultProvider = null;
        this.running = false;
    }
    assignProvider(provider) {
        this.ethersProvider = provider;
    }
    assignSigner(signer) {
        this.ethersSigner = signer;
    }
    subscribeToEvents(eventDictionary, onComplete) {
        start_event_listeners_1.startEventListeners(eventDictionary, onComplete);
    }
    startService() {
        if (this.running) {
            return;
        }
        if (this.ethersProvider == null) {
            return;
        }
        console.log('Starting service...');
        //sync node
        this.syncing = true;
        this.eventEmitter.emit(constants_1.RPCEvents.StartSyncing);
        sync_with_ethereum_node_1.syncWithEthereumNode()
            .then(() => {
            this.syncing = false;
            this.eventEmitter.emit(constants_1.RPCEvents.StopSyncing);
            console.log('Finished syncing ethereum node.');
        })
            .catch(err => {
            console.log('Error while syncing ethereum node: ' + err);
        });
        this.running = true;
        this.eventEmitter.emit(constants_1.ServiceEvents.ServiceStarted);
        console.log('Finished starting service...');
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
    getProviderInterface() {
        return this.ethersProvider;
    }
    getSignersInterface() {
        return this.ethersSigner;
    }
    setDefaultProvider(provider) {
        this.defaultProvider = provider;
    }
}
const opportunityService = new OpportunityService();
exports.default = opportunityService;
//# sourceMappingURL=OpportunityService.js.map