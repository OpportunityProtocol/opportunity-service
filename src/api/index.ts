import { syncWithEthereumNode } from "../events/sync-with-ethereum-node";
import syncJobs from "../sync/sync-jobs";
import syncMarkets from "../sync/sync-markets";
import { completeRelationship } from "./exchange/complete-relationship";
import { createTask } from "./exchange/create-task";
import { enterWorkRelationship } from "./exchange/enter-work-relationship";
import { createMarket } from "./market/create-market";

function generateAPI() {
    return {
        exchange: {
            completeRelationship: completeRelationship,
            createTask: createTask,
            enterWorkRelationship: enterWorkRelationship
        },
        dispute: {},
        identity: {},
        markets: {
            createMarket: createMarket,
        },
        network: {
            sync: {
                syncWithEthereum: syncWithEthereumNode,
                syncMarkets: syncMarkets,
                syncJobs: syncJobs
            }
        }
    }
}

const opportunityAPI = generateAPI();

export default opportunityAPI;