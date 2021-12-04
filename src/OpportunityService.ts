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

import Web3 from 'web3';

class OpportunityService {
    private eventEmitter = opportunityEventEmitter;
    private running: boolean = false;
    private syncing: boolean;
    private ethersProvider : providers.JsonRpcProvider = ethers.getDefaultProvider('http://localhost:8545');
    private ethersSigner : providers.JsonRpcSigner = null;
    private static defaultProvider;// = new Web3('http://localhost:8545')
    private opportunityLogger = null;
    private storageProvider = opportunityStorageProvider;
    private currentAccount = null;
    private ethNetwork : string = 'rinkeby'
    public api  = opportunityAPI;

    private static instance: OpportunityService;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        this.ethNetwork = 'rinkeby'
    }

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
        OpportunityService.defaultProvider = provider;
    }

    assignProvider(provider : any) {
        this.ethersProvider = provider;
    }

    assignSigner(signer : any) {
        this.ethersSigner = signer;
    }

    assignCurrentAccount(account : string) {
        this.currentAccount = account;
    }

    subscribeToEvents(eventDictionary : EventCallbackDictionary, onComplete) {
        startEventListeners(eventDictionary, onComplete);
    }

    setEthNetwork(network) {
        switch(network) {
            case 1:
                this.ethNetwork = 'mainnet'
                break
            case 4:
                this.ethNetwork = 'rinkeby'
                break
            default:
                this.ethNetwork = 'rinkeby'
        }
    }

    getEthNetwork() {
        return this.ethNetwork;
    }

    async startService() {
        if (this.running) { return; }

        console.log('Starting service...');
        this.sync();
        this.running = true;
        console.log('Finished starting service...')
    }

    shutdownService() {
        if (!this.running) { return };
        this.running = false;
        this.assignDefaultProvider(null);
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
        return OpportunityService.defaultProvider;
    }

    getProviderInterface() : providers.JsonRpcProvider {
        return this.ethersProvider;
    }

    getSignersInterface() : providers.JsonRpcSigner {
        return this.ethersSigner;
    }
}

const opportunityService = OpportunityService.getInstance();
export default opportunityService;