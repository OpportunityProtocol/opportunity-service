import opportunityService from "../OpportunityService";
import { processLog } from './process/process-log';
import * as addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';

async function syncJobs(marketAddress) {
     //sync Jobs
     await opportunityService.getProviderInterface().getLogs({ 
        address: '0xef4048590cf6872ff0cf7cd076fb26a0a5f006da', 
        fromBlock: 1, 
        toBlock: 'latest' 
    }).then((logs) => {
        console.log('Found logs.. Processing sync Jobs')
        logs.forEach(log => {
            if (log && Array.isArray(log.topics) && log.topics.length) {
                processLog(log); // keccashinside here
            }
        })
    })
    .catch(err => {
        console.log('Err on fetching logs from blockchain: ' + err)
    })
}

export default syncJobs;