import ethrpc from '../rpc/interface/rpc-interface';
import * as addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';
import { processLog } from './process/process-log';

function syncMarkets() {
    //sync Markets and Work Relationships
    ethrpc.getLogs({ address: addressMap[Contracts.MARKET_FACTORY], fromBlock: 0, toBlock: 'latest' }, (err, logs) => {
        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                processLog(log);
            }
        })
    });
}

module.exports = syncMarkets;