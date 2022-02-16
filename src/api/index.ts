import { syncWithEthereumNode } from '../events/sync-with-ethereum-node'
import syncJobs from '../sync/sync-jobs'
import syncMarkets from '../sync/sync-markets'
import { completeRelationship } from './exchange/complete-relationship'
import { createTask } from './exchange/create-task'
import { enterWorkRelationship } from './exchange/enter-work-relationship'
import registerNewUser from './identity/register-new-user'
import { createMarket } from './market/create-market'

import { abis, events, addresses, bytecode } from './internal/index'

import { sendAsync } from './ethereum/sendAsync'

function generateAPI() {
  return {
    internal: {
      abis: abis,
      addresses,
      bytecode,
    },
    exchange: {
      completeRelationship,
      createTask,
      enterWorkRelationship,
    },
    dispute: {},
    identity: {
      registerNewUser,
    },
    markets: {
      createMarket,
    },
    network: {
      sync: {
        syncWithEthereum: syncWithEthereumNode,
        syncMarkets,
        syncJobs,
      },
    },
    provider: {
      sendAsync,
    },
  }
}

const opportunityAPI = generateAPI()

export default opportunityAPI
