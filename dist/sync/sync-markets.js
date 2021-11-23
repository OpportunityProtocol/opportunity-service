var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import opportunityService from '../OpportunityService';
import * as addressMap from '../blockchain/addresses.json';
import { Contracts } from '../constants';
import { processLog } from './process/process-log';
function syncMarkets() {
    return __awaiter(this, void 0, void 0, function* () {
        //sync Markets
        yield opportunityService.getProviderInterface().getLogs({
            address: addressMap[Contracts.MARKET_FACTORY],
            fromBlock: 1,
            toBlock: 'latest'
        }).then((logs) => {
            console.log('Found logs.. Processing...');
            logs.forEach(log => {
                if (log && Array.isArray(log.topics) && log.topics.length) {
                    processLog(log); // keccashinside here
                }
            });
        })
            .catch(err => {
            console.log('Err on fetching logs from blockchain: ' + err);
        });
    });
}
export default syncMarkets;
//# sourceMappingURL=sync-markets.js.map