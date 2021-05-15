import { Contracts, MarketEvents } from '../../constants';
import ethrpc from '../../rpc/interface/rpc-interface';
import * as abiMap from '../../blockchain/abi.json';
import { knex } from '../../database/index';
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
    knex.select()
        .insert({
            index: marketIndex,
            marketAddress: marketAddress,
            name: marketContractInstance.methods.get_marketName(),
            marketType: marketContractInstance.methods.get_marketType(),
            requiredReputation: marketContractInstance.methods.get_requiredReputation(),
            requiredIndustryReputation: marketContractInstance.methods.get_requiredIndustryReputation(),
            marketStatus: marketContractInstance.methods.get_marketStatus(),
            relationships: relationshipAddresses
        })
        .into('markets')
        .then(() => {
            opportunityEventEmitter.emit(MarketEvents.MarkedCreated);
        })

    //update data db
    //go through the address of each relationship, create the contract and extract the status and metadata pointer;
    //update work db for work relationships
    for (const relationship in relationshipAddresses) {
        const relationshipContractInstance = new ethrpc.eth.Contract(abiMap[Contracts.WORK_RELATIONSHIP], relationship);

        const contractStatus = relationshipContractInstance.methods.get_contractStatus().call();
        const contractTaskName = relationshipContractInstance.methods.get_contractTaskName().call();
        //update db
        knex.select().insert({
            marketAddress: marketAddress,
            marketID: marketContractInstance.methods.get_marketName(),
            address: relationship,
            taskName: contractTaskName,
            status: contractStatus
        })
        .into('relationships')
        .then(() => {
           
        })
    }

}

export { processMarketCreatedEvent };