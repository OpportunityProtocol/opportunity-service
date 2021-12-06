import { syncWithEthereumNode } from "../events/sync-with-ethereum-node";
import syncJobs from "../sync/sync-jobs";
import syncMarkets from "../sync/sync-markets";
import { completeRelationship } from "./exchange/complete-relationship";
import { createTask } from "./exchange/create-task";
import { enterWorkRelationship } from "./exchange/enter-work-relationship";
import registerNewUser from "./identity/register-new-user";
import { createMarket } from "./market/create-market";

import { abis, events, getContractAddress} from './internal/index'; 

import { sendAsync } from './ethereum/sendAsync'
import { parseCypher } from "./util/parse-cipher";
import { stringifyCypher } from "./util/stringify-cipher";
import { decryptByPrivateKey, encryptByPublicKey } from "./util/encrypt-by-public-key";
import { createEthCryptoCreds } from "./other/create-eth-crypto-creds";
import { encrypt } from "./provider/encrypt";
import { decrypt } from "./provider/decrypt";
import { connectGateways, getOracleClient } from "./dispute/connect";
import { checkVoteResults } from "./dispute/check-vote-results";
import { ensureEntityMetadata } from "./dispute/ensure-entity-metadata";
import { launchNewVote } from "./dispute/launch-new-vote";
import { submitVote } from "./dispute/submit-vote";

function generateAPI() {
    return {
        crypto: {
            encryptByPublicKey,
            decryptByPrivateKey,
            createEthCryptoCreds
        },
        internal: {
            abis: abis,
            getContractAddress,
        },
        exchange: {
            completeRelationship,
            createTask,
            enterWorkRelationship
        },
        dispute: {
            connectGateways: connectGateways,
            getOracleClient: getOracleClient,
            checkVoteResults: checkVoteResults,
            ensureEntityMetadata: ensureEntityMetadata,
            launchNewVote: launchNewVote,
            submitVote: submitVote
        },
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
        provider: {
            sendAsync,
            encrypt,
            decrypt
        },
        util: {
            parseCypher,
            stringifyCypher
        }
    }
}

const opportunityAPI = generateAPI();

export default opportunityAPI;