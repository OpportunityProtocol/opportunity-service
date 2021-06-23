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
const constants_1 = require("./constants");
const OpportunityEventEmitter_1 = __importDefault(require("./events/OpportunityEventEmitter"));
const sync_with_ethereum_node_1 = require("./events/sync-with-ethereum-node");
const abi_json_1 = __importDefault(require("./blockchain/abi.json"));
const addresses_json_1 = __importDefault(require("./blockchain/addresses.json"));
const blocks_json_1 = __importDefault(require("./blockchain/blocks.json"));
const ethers_1 = require("ethers");
const start_event_listeners_1 = require("./events/start-event-listeners");
const index_1 = __importDefault(require("./api/index"));
const OpportunityStorageProvider_1 = __importDefault(require("./modules/storage/OpportunityStorageProvider"));
class OpportunityService {
    /** */
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    constructor() {
        this.eventEmitter = OpportunityEventEmitter_1.default;
        this.running = false;
        this.ethersProvider = ethers_1.ethers.getDefaultProvider('http://localhost:8545');
        this.ethersSigner = null;
        this.ethersGSNProvider = null;
        this.ethersGSNSigner = null;
        this.opportunityLogger = null;
        this.storageProvider = OpportunityStorageProvider_1.default;
        this.currentAccount = null;
        this.api = index_1.default;
        /* DEV */
        this.DEVforwarderAddress = null;
        this.DEVpaymasterAddress = null;
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
    static assignDefaultProvider(provider) {
        this.defaultProvider = provider;
    }
    assignGSNProvider(provider) {
        this.ethersGSNProvider = provider;
    }
    assignGSNSigner(signer) {
        this.ethersGSNSigner = signer;
    }
    assignProvider(provider) {
        if (OpportunityService.defaultProvider == null) {
            OpportunityService.assignDefaultProvider(provider);
        }
        this.ethersProvider = provider;
    }
    assignSigner(signer) {
        this.ethersSigner = signer;
    }
    assignCurrentAccount(account) {
        this.currentAccount = account;
    }
    assignDEVForwarderAddress(address) {
        this.DEVforwarderAddress = address;
    }
    assignDEVPaymasterAddress(address) {
        this.DEVpaymasterAddress = address;
    }
    subscribeToEvents(eventDictionary, onComplete) {
        start_event_listeners_1.startEventListeners(eventDictionary, onComplete);
    }
    DEVrunGSN() {
        //execSync('gsn start');
    }
    startService() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.running) {
                return;
            }
            // await this.DEVrunGSN();
            //this.assignDEVForwarderAddress('./build/gsn/Forwarder.json').address;
            //this.assignDEVPaymasterAddress('./build/gsn/Paymaster.json').address;
            console.log('Starting service...');
            this.sync();
            this.running = true;
            console.log('Finished starting service...');
        });
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
        return OpportunityService.defaultProvider;
    }
    getProviderInterface() {
        return this.ethersProvider;
    }
    getSignersInterface() {
        return this.ethersSigner;
    }
    getGSNProviderInterface() {
        return this.ethersGSNProvider;
    }
    getGSNSignersInterface() {
        return this.ethersGSNSigner;
    }
    getForwarderAddress() {
        return this.DEVforwarderAddress;
    }
    getPaymasterAddress() {
        return this.DEVpaymasterAddress;
    }
    setDefaultProvider(provider) {
        OpportunityService.defaultProvider = provider;
    }
}
OpportunityService.defaultProvider = null;
const opportunityService = OpportunityService.getInstance();
exports.default = opportunityService;
//# sourceMappingURL=OpportunityService.js.map