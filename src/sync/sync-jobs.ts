import opportunityService from "../OpportunityService";
import { processLog } from './process/process-log';
import * as addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';

async function syncJobs(marketAddress) {
    if (opportunityService.getProviderInterface()) {
     //sync Jobs
     await opportunityService.getProviderInterface().getLogs({ 
        address: marketAddress, 
        fromBlock: 1, 
        toBlock: 'latest',
        topics: ['WorkRelationshipCreated(address,address,address)']
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

export default syncJobs;