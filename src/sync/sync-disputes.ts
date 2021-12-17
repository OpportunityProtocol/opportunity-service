import opportunityService from "../OpportunityService";
import { processLog } from './process/process-log';
import * as addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';

async function syncCreatedDisputes(userSummaryAddress) {
    if (opportunityService.getProviderInterface()) {
     await opportunityService.getProviderInterface().getLogs({ 
        address: userSummaryAddress, 
        fromBlock: 1, 
        toBlock: 'latest',
        topics: [
            'DisputeCreated(address,address,address,address)'
        ]
    }).then((logs) => {
        console.log('Found logs.. Processing sync disputes')
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
}

export default syncCreatedDisputes;