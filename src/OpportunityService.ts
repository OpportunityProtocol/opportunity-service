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
import { EthNetworkID } from "dvote-js";
import Web3 from 'web3';
import OpportunityStorageProvider from "./modules/storage/OpportunityStorageProvider";
import { createAlchemyWeb3 } from "@alch/alchemy-web3"

import { Shh } from 'web3-shh'

class OpportunityService {
    private eventEmitter = opportunityEventEmitter;
    private running: boolean = false;
    private syncing: boolean = false;
    private opportunityProvider; // : providers.JsonRpcProvider;
    private ethersProvider : providers.JsonRpcProvider = ethers.getDefaultProvider('http://localhost:8545');
    private ethersSigner : providers.JsonRpcSigner = null;
    private static defaultProvider;
    private opportunityLogger = null;
    private storageProvider = null;
    private currentAccount = null;
    private ethNetwork : EthNetworkID | string = 'rinkeby'
    private whisperProvider = null;
    public storage = null

    private static instance: OpportunityService;

    public api  = opportunityAPI;

    private static instance: OpportunityService;
    private constructor() {}

    public static getInstance(): OpportunityService {
        if (!OpportunityService.instance) {
            OpportunityService.instance = new OpportunityService();
        }

        return OpportunityService.instance;
    }
    
    async assignDefaultProvider(provider : Web3) {
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

    setNetworkParameters(networkId: string, dbAddress: string) {
        switch(parseInt(networkId, 10)) {
            case 1:
                this.ethNetwork = 'mainnet'
                break
            case 4:
                this.ethNetwork = 'rinkeby'
                break
            default:
                this.ethNetwork = 'rinkeby'
        }

        //this.storageProvider = new OpportunityStorageProvider(dbAddress)
    }

    public getEthNetwork(): EthNetworkID | string {
        return this.ethNetwork
    }

    getStorageProvider() {
        return this.storageProvider
    }

    async startService() {
        if (this.running) { return; }

        this.sync();
        this.running = true;
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
                this.syncing = false;
            })
            .catch(err => {
                this.syncing = false;
            })
    }

    isSyncing() {
        return this.syncing;
    }

    getDefaultProviderInterface() {
        return OpportunityService.defaultProvider;
    }

    getProviderInterface() : providers.JsonRpcProvider {
        if (this.opportunityProvider) {
            return this.opportunityProvider
        }
   
        return this.ethersProvider;
    }

    getSignersInterface() : providers.JsonRpcSigner {
        return this.ethersSigner;
    }

    getWhisperProvider() : any {
        return this.whisperProvider
    }
}

const opportunityService = OpportunityService.getInstance();
export default opportunityService;