import { Knex } from "knex";
import { opportunityConnectionProvider } from "./accounts";
import opportunityAPI from "./api";
import { DBHealthStatus, RPCEvents, ServiceEvents } from "./constants";
import { createDB } from "./database";
import opportunityEventEmitter from "./events/OpportunityEventEmitter";
import { syncWithEthereumNode } from "./events/sync-with-ethereum-node";
import { connectRpc, disconnectRpc } from "./rpc/index";
import rpc from './rpc/interface/rpc-interface';

class OpportunityService {
    private readonly logger = null;
    private readonly connectionProvider = opportunityConnectionProvider;
    private readonly eventEmitter = opportunityEventEmitter;
    private running : boolean;
    private syncing : boolean;
    private db : Knex = null;

    public readonly api = opportunityAPI;
    public readonly rpc = rpc;


    constructor() {
        this.running = false;
    }

    startService() {
        if (this.running) { return; }

        //connect rpc
        connectRpc(this.rpc);

        //check database health
        this.db = createDB();

        //sync node
        this.syncing = true;
        this.eventEmitter.emit(RPCEvents.StartSyncing);
        syncWithEthereumNode().then(() => {
            this.syncing = false;
            this.eventEmitter.emit(RPCEvents.StopSyncing);
        })

        this.running = true;
        this.eventEmitter.emit(ServiceEvents.ServiceStarted);
    }

    shutdownService() {
        if (!this.running) { return };
        disconnectRpc(this.rpc);
        this.running = false;
        this.eventEmitter.emit(ServiceEvents.ServiceStopped);
    }

    isSyncing() {
        return this.syncing;
    }
}

const opportunityService = new OpportunityService();
export default opportunityService;