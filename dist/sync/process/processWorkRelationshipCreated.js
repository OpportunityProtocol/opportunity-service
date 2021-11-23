import { Contracts, ExchangeEvents } from '../../constants';
import * as abiMap from '../../blockchain/abi.json';
import opportunityService from '../../OpportunityService';
import { ethers } from 'ethers';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';
/**
 * WorkRelationshipCreated(address owner, address relationship, address market)
 * @param log
 * @returns
 */
function processWorkRelationshipCreatedEvent(log) {
    try {
        const iface = new ethers.utils.Interface(abiMap[Contracts.MARKET]);
        const decodedLog = iface.parseLog(log);
        const { args, signature } = decodedLog;
        const relationshipOwner = args[0];
        const relationshipAddress = args[1];
        const relationshipMarketAddress = args[2];
        console.log('Processing ' + signature + ' with args: '
            + 'Owner: ' + relationshipOwner + ', Address: ' + relationshipAddress + ', and Market Address: ' + relationshipAddress);
        const relationshipContractInstance = new ethers.Contract(relationshipAddress, abiMap[Contracts.WORK_RELATIONSHIP], opportunityService.getSignersInterface());
        const relationshipStatus = 0; //relationshipContractInstance.get_contractStatus();
        const relationshipType = 0;
        let relationshipData = {
            relationshipOwner,
            relationshipAddress,
            relationshipMarketAddress,
            relationshipStatus,
            relationshipType
        };
        opportunityEventEmitter.emit(ExchangeEvents.WorkRelationshipCreated, relationshipData);
    }
    catch (error) {
        console.log(error);
    }
}
export { processWorkRelationshipCreatedEvent };
//# sourceMappingURL=processWorkRelationshipCreated.js.map