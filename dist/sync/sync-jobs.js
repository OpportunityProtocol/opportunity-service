var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import opportunityService from "../OpportunityService";
import { processLog } from './process/process-log';
function syncJobs(marketAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (opportunityService.getProviderInterface()) {
            //sync Jobs
            yield opportunityService.getProviderInterface().getLogs({
                address: marketAddress,
                fromBlock: 1,
                toBlock: 'latest',
                topics: ['WorkRelationshipCreated(address,address,address)']
            }).then((logs) => {
                console.log('Found logs.. Processing sync Jobs');
                logs.forEach(log => {
                    if (log && Array.isArray(log.topics) && log.topics.length) {
                        processLog(log); // keccashinside here
                    }
                });
            })
                .catch(err => {
                console.log('Err on fetching logs from blockchain: ' + err);
            });
        }
    });
}
export default syncJobs;
//# sourceMappingURL=sync-jobs.js.map