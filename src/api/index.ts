import { syncWithEthereumNode } from "../events/sync-with-ethereum-node";
import syncJobs from "../sync/sync-jobs";
import syncMarkets from "../sync/sync-markets";
import { completeRelationship } from "./exchange/complete-relationship";
import { createTask } from "./exchange/create-task";
import { enterWorkRelationship } from "./exchange/enter-work-relationship";
import registerNewUser from "./identity/register-new-user";
import { createMarket } from "./market/create-market";

import { abis, events, addresses } from './internal/index'; 

function generateAPI() {
    return {
        exchange: {
            completeRelationship,
            createTask,
            enterWorkRelationship
        },
        dispute: {},
        identity: {
            registerNewUser
        },
        markets: {
            createMarket,
        },
        network: {
            sync: {
                syncWithEthereum: syncWithEthereumNode,
                syncMarkets,
                syncJobs
            }
        },
        internal: {
            abis,
            events,
            addresses
        }
    }
}

const opportunityAPI = generateAPI();

export default opportunityAPI;