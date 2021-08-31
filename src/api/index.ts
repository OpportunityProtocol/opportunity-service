import { syncWithEthereumNode } from "../events/sync-with-ethereum-node";
import syncJobs from "../sync/sync-jobs";
import syncMarkets from "../sync/sync-markets";
import { completeRelationship } from "./exchange/complete-relationship";
import { createTask } from "./exchange/create-task";
import { enterWorkRelationship } from "./exchange/enter-work-relationship";
import { createMarket } from "./market/create-market";
import registerNewUser  from './identity/register-new-user'
import addresses from './internal/addresses';
import abis from './internal/abis';

function generateAPI() {
    return {
        internal: {
            addresses: addresses,
            abis: abis,
        },
        exchange: {
            completeRelationship: completeRelationship,
            createTask: createTask,
            enterWorkRelationship: enterWorkRelationship
        },
        dispute: {},
        identity: {
            registerNewUser
        },
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