import { Contracts, DBHealthStatus, RPCEvents, ServiceEvents } from "./constants";
import opportunityEventEmitter from "./events/OpportunityEventEmitter";
import { syncWithEthereumNode } from "./events/sync-with-ethereum-node";

import abiMap from './blockchain/abi.json';
import addressesMap from './blockchain/addresses.json';
import blocksMap from './blockchain/blocks.json';
import { ethers, providers } from "ethers";
import { EventCallbackDictionary } from "./types";
import { startEventListeners } from "./events/start-event-listeners";
import opportunityAPI from './api/index';
import opportunityStorageProvider from "./modules/storage/OpportunityStorageProvider";
import OpportunityChatProvider from "./modules/whisper/OpportunityChatProvider";

import Web3 from 'web3';

class OpportunityService {
    private eventEmitter = opportunityEventEmitter;
    private running: boolean = false;
    private syncing: boolean;
    private ethersProvider : providers.JsonRpcProvider = ethers.getDefaultProvider('http://localhost:8545');
    private ethersSigner : providers.JsonRpcSigner = null;
<<<<<<< HEAD
    private static defaultProvider = null;
=======
    private defaultProvider = new Web3('wss://silent-bold-sea.rinkeby.quiknode.pro/1dbc05d5626c99bd2ad24ada0c962fc90f15b007/')
    private chatProvider = null;
>>>>>>> 097806233a7c7c444f78eb359752907815258c53
    private opportunityLogger = null;
    private storageProvider = opportunityStorageProvider;
    private currentAccount = null;
    private readonly chatProvider = opportunityChatProvider;


    public api  = opportunityAPI;

    private static instance: OpportunityService;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {}

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): OpportunityService {
        if (!OpportunityService.instance) {
            OpportunityService.instance = new OpportunityService();
        }

        return OpportunityService.instance;
    }
    
    assignDefaultProvider(provider : Web3) {
        this.defaultProvider = provider;
    }

    assignProvider(provider : providers.JsonRpcProvider) {
        this.ethersProvider = provider;
    }

    assignSigner(signer : providers.JsonRpcSigner) {
        this.ethersSigner = signer;
    }

    assignCurrentAccount(account : string) {
        this.currentAccount = account;
    }

    subscribeToEvents(eventDictionary : EventCallbackDictionary, onComplete) {
        startEventListeners(eventDictionary, onComplete);
    }

    async startService() {
        if (this.running) { return; }

        console.log('Starting service...');
        this.chatProvider = new OpportunityChatProvider(this.currentAccount, this.ethersProvider, this.defaultProvider);
        this.sync();
        this.running = true;
        console.log('Finished starting service...')
    }

    shutdownService() {
        if (!this.running) { return };
        this.running = false;
        this.setDefaultProvider(null);
        this.assignProvider(null);
        this.assignSigner(null)
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
                console.log('Finished syncing ethereum node.')
                this.syncing = false;
            })
            .catch(err => {
                console.log('Error while syncing ethereum node: ' + err)
                this.syncing = false;
            })
    }

    isSyncing() {
        return this.syncing;
    }

    accessContractUploadBlock(contract: Contracts) {
        return blocksMap[contract];
    }

    accessContractAddress(contract: Contracts) {
        return addressesMap[contract];
    }

    accessContractABI(contract: Contracts) {
        return abiMap[contract];
    }

    getDefaultProviderInterface() {
        return this.defaultProvider;
    }

    getProviderInterface() : providers.JsonRpcProvider {
        return this.ethersProvider;
    }

    getSignersInterface() : providers.JsonRpcSigner {
        return this.ethersSigner;
    }

    getChatProviderInterface() {
        return this.chatProvider;
    }

    setDefaultProvider(provider : providers.JsonRpcSigner) {
        this.defaultProvider = provider;
    }
}

const opportunityService = OpportunityService.getInstance();
export default opportunityService;