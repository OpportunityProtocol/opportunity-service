import opportunityService from "../OpportunityService";
import { processLog } from './process/process-log';
import * as addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';

async function syncJobs(marketAddress) {
     //sync Jobs
     await opportunityService.getProviderInterface().getLogs({ 
        address: marketAddress, 
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