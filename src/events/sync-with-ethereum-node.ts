import * as addressMap from '../blockchain/addresses.json';
import * as blockMap from '../blockchain/blocks.json';
import opportunityService from '../OpportunityService';
import { processLog } from '../sync/process/process-log';
import { Contracts } from '../constants';
import { id } from '@ethersproject/hash';
import syncMarkets from '../sync/sync-markets';
import syncJobs from '../sync/sync-jobs';

async function syncWithEthereumNode(): Promise<void> {
    console.log('Syncing with ethereum node..');
    const highestBlockNumber = 1//blockMap[Contracts.MARKET_FACTORY]; //get highest block number form db

    syncMarkets()
    syncJobs('0x7b7002b2bf3e0ecdda16c8f90edad483e7eeb4de')
}

export { syncWithEthereumNode };