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
const index_1 = __importDefault(require("./api/index"));
class OpportunityService {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    constructor() {
        this.eventEmitter = OpportunityEventEmitter_1.default;
        this.running = false;
        this.ethersProvider = null;
        this.ethersSigner = null;
        this.defaultProvider = null;
        this.opportunityLogger = null;
        this.api = index_1.default;
    }
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    static getInstance() {
        if (!OpportunityService.instance) {
            OpportunityService.instance = new OpportunityService();
        }
        return OpportunityService.instance;
    }
    assignDefaultProvider(provider) {
        this.defaultProvider = provider;
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
        console.log('Starting service...');
        this.sync();
        this.running = true;
        console.log('Finished starting service...');
    }
    shutdownService() {
        if (!this.running) {
            return;
        }
        ;
        this.running = false;
        this.setDefaultProvider(null);
        this.assignProvider(null);
        this.assignSigner(null);
        this.eventEmitter.emit(constants_1.ServiceEvents.ServiceStopped);
    }
    sync() {
        //sync node
        this.syncing = true;
        this.eventEmitter.emit(constants_1.RPCEvents.StartSyncing);
        sync_with_ethereum_node_1.syncWithEthereumNode()
            .then(() => {
            this.syncing = false;
            this.eventEmitter.emit(constants_1.RPCEvents.StopSyncing);
            console.log('Finished syncing ethereum node.');
            this.syncing = false;
        })
            .catch(err => {
            console.log('Error while syncing ethereum node: ' + err);
            this.syncing = false;
        });
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
    getDefaultProviderInterface() {
        return this.defaultProvider;
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
const opportunityService = OpportunityService.getInstance();
exports.default = opportunityService;
//# sourceMappingURL=OpportunityService.js.map