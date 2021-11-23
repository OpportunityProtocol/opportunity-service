var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RPCEvents, ServiceEvents } from "./constants";
import opportunityEventEmitter from "./events/OpportunityEventEmitter";
import { syncWithEthereumNode } from "./events/sync-with-ethereum-node";
import abiMap from './blockchain/abi.json';
import addressesMap from './blockchain/addresses.json';
import blocksMap from './blockchain/blocks.json';
import { ethers } from "ethers";
import { startEventListeners } from "./events/start-event-listeners";
import opportunityAPI from './api/index';
import opportunityStorageProvider from "./modules/storage/OpportunityStorageProvider";
class OpportunityService {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    constructor() {
        this.eventEmitter = opportunityEventEmitter;
        this.running = false;
        this.ethersProvider = ethers.getDefaultProvider('http://localhost:8545');
        this.ethersSigner = null;
        this.opportunityLogger = null;
        this.storageProvider = opportunityStorageProvider;
        this.currentAccount = null;
        this.api = opportunityAPI;
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
        OpportunityService.defaultProvider = provider;
    }
    assignProvider(provider) {
        this.ethersProvider = provider;
    }
    assignSigner(signer) {
        this.ethersSigner = signer;
    }
    assignCurrentAccount(account) {
        this.currentAccount = account;
    }
    subscribeToEvents(eventDictionary, onComplete) {
        startEventListeners(eventDictionary, onComplete);
    }
    setEthNetwork(network) {
        this.ethNetwork = network;
    }
    getEthNetwork() {
        return this.ethNetwork;
    }
    startService() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.running) {
                return;
            }
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
        this.assignDefaultProvider(null);
        this.assignProvider(null);
        this.assignSigner(null);
        this.eventEmitter.emit(ServiceEvents.ServiceStopped);
    }
    sync() {
        //sync node
        this.syncing = true;
        this.eventEmitter.emit(RPCEvents.StartSyncing);
        syncWithEthereumNode()
            .then(() => {
            this.syncing = false;
            this.eventEmitter.emit(RPCEvents.StopSyncing);
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
        return blocksMap[contract];
    }
    accessContractAddress(contract) {
        return addressesMap[contract];
    }
    accessContractABI(contract) {
        return abiMap[contract];
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
}
const opportunityService = OpportunityService.getInstance();
export default opportunityService;
//# sourceMappingURL=OpportunityService.js.map