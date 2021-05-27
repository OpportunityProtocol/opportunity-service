import { Contracts, DBHealthStatus, RPCEvents, ServiceEvents } from "./constants";
import opportunityEventEmitter from "./events/OpportunityEventEmitter";
import { syncWithEthereumNode } from "./events/sync-with-ethereum-node";
import { opportunityChatProvider } from "./modules/chat/OpportunityChatProvider";
import { connectRpc, disconnectRpc } from "./rpc/index";
import rpc from './rpc/interface/rpc-interface';

import abiMap from './blockchain/abi.json';
import addressesMap from './blockchain/addresses.json';
import blocksMap from './blockchain/blocks.json';

class OpportunityService {
     //logger = null;
     private eventEmitter = opportunityEventEmitter;
     private running : boolean = false;
     private syncing : boolean;
     private rpc = rpc;

    constructor() {
        this.running = false;
    }

    startService() {
        if (this.running) { return; }
        connectRpc(this.rpc)

        //sync node
        this.syncing = true;
        this.eventEmitter.emit(RPCEvents.StartSyncing);
        syncWithEthereumNode()
        .then(() => {
            this.syncing = false;
            this.eventEmitter.emit(RPCEvents.StopSyncing);
        })
        .catch(err => {
            console.log(err)
        })

        this.running = true;
        this.eventEmitter.emit(ServiceEvents.ServiceStarted);
    }

    shutdownService() {
        if (!this.running) { return };
        this.running = false;
        this.eventEmitter.emit(ServiceEvents.ServiceStopped);
    }

    isSyncing() {
        return this.syncing;
    }

    accessContractUploadBlock(contract : Contracts) {
        return blocksMap[contract];
    }

    accessContractAddress(contract : Contracts) {
        return addressesMap[contract];
    }

    accessContractABI(contract : Contracts) {
        return abiMap[contract];
    }
}

const opportunityService = new OpportunityService();
export default opportunityService;