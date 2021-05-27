import { Contracts, MarketEvents } from '../../constants';
import ethrpc from '../../rpc/interface/rpc-interface';
import * as abiMap from '../../blockchain/abi.json';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

/**
 * 
 * @param eventData 
 * @returns 
 */
function processMarketCreatedEvent(eventData) {
    //get market data
    const initialMarketData = eventData[1];
    const marketIndex = eventData[2];
    const marketAddress = eventData[3];

    const marketContractInstance = new ethrpc.eth.Contract(abiMap[Contracts.MARKET], marketAddress);

    //get a market's address and instantiate a new contract to get all work relationships
    let relationshipAddresses = [];
    relationshipAddresses = marketContractInstance.methods.getWorkRelationships().call();

    //update db for markets

    //update data db
    //go through the address of each relationship, create the contract and extract the status and metadata pointer;
    //update work db for work relationships
    for (const relationship in relationshipAddresses) {
        const relationshipContractInstance = new ethrpc.eth.Contract(abiMap[Contracts.WORK_RELATIONSHIP], relationship);

        const contractStatus = relationshipContractInstance.methods.get_contractStatus().call();
        const contractTaskName = relationshipContractInstance.methods.get_contractTaskName().call();
        //update db
 
    }

}

export { processMarketCreatedEvent };