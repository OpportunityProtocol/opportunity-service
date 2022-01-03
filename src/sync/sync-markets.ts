import opportunityService from '../OpportunityService';
import addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';
import { processLog } from './process/process-log';

async function syncMarkets() {
     if (opportunityService.getProviderInterface()) {
     //sync Markets
     await opportunityService.getProviderInterface().getLogs({ 
        address: addressMap[opportunityService.getEthNetwork()][Contracts.MARKET_FACTORY], 
        fromBlock: 1, 
        toBlock: 'latest' 
    }).then((logs) => {

        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                processLog(log); // keccashinside here
            }
        })
    })
    .catch(error => {
        console.log(error)
    })
    }
}

export default syncMarkets;