import * as addressMap from '../blockchain/addresses.json';
import * as blockMap from '../blockchain/blocks.json';
import opportunityService from '../OpportunityService';
import ethrpc from  '../rpc/interface/rpc-interface';
import { processLog } from '../sync/process/process-log';
import { Contracts } from '../constants';

async function syncWithEthereumNode(): Promise<void> {
    const highestBlockNumber = 0; //get highest block number form db

    //sync Markets and Work Relationships
    await ethrpc.getLogs({ address: addressMap[Contracts.MARKET_FACTORY], fromBlock: highestBlockNumber, toBlock: 'latest' }, (err, logs) => {
        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                processLog(log); // keccashinside here
            }
        })
    });
}

export { syncWithEthereumNode };