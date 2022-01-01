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
    private static defaultProvider = new Web3('http://localhost:8545')
    private opportunityLogger = null;
    private storageProvider = null;
    private currentAccount = null;
    private ethNetwork : EthNetworkID | string = 'rinkeby'
    private whisperProvider = null;
    public storage = null

    private static instance: OpportunityService;

    public api  = opportunityAPI;

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() {
        const web3 = createAlchemyWeb3(process.env.NODE_ENV == 'dev' ?  "https://eth-mainnet.alchemyapi.io/v2/JKVeBInuvm4wq9_8fECUmazLbm7Vpv5V" : "https://eth-mainnet.alchemyapi.io/v2/7d2CRio84usjQwU8tRPG75rqV1wJmX_W");
        this.ethNetwork = 'mainnet'

        this.opportunityProvider = new ethers.providers.JsonRpcProvider(/*process.env.NODE_ENV == 'dev' ?  "https://eth-mainnet.alchemyapi.io/v2/JKVeBInuvm4wq9_8fECUmazLbm7Vpv5V" : "https://eth-mainnet.alchemyapi.io/v2/7d2CRio84usjQwU8tRPG75rqV1wJmX_W"*/)
        console.log(this.opportunityProvider)
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

        console.log(networkId)

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

    getDefaultProviderInterface() {
        return OpportunityService.defaultProvider;
    }

    getProviderInterface() : providers.JsonRpcProvider {
        if (this.opportunityProvider) {
            console.log('Provider is not null')
            console.log(this.opportunityProvider)
            return this.opportunityProvider
        } else {
            console.log('provider is null')
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