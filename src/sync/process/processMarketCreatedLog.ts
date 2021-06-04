import { Contracts, MarketEvents } from '../../constants';
import * as abiMap from '../../blockchain/abi.json';
import * as addressMap from '../../blockchain/addresses.json';
import opportunityService from '../../OpportunityService';
import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
import { AbiCoder, EventFragment, Interface, LogDescription, Result } from '@ethersproject/abi';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

/**
 * MarketCreated(_market: address, index: uint256, _marketAddress: address, owner: address)
 * @param eventData 
 * @returns 
 */
function processMarketCreatedEvent(log) {
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.MARKET_FACTORY]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const marketAddress = args[0];
    const marketIndex = args[1];
    const marketOwner = args[2];
    const marketName = args[3];
    const marketType = args[4];

    console.log('Processing ' + signature + ' with args: ' 
    + 'Market Address: ' + marketAddress + ', Index: ' 
    + marketIndex + ', Owner: ' + marketOwner, ', Market Name: ' + marketName, + ', and Market Type: ' + marketType);

    const marketContractInstance = new ethers.Contract(marketAddress,
        abiMap[Contracts.MARKET], 
         opportunityService.getProviderInterface());

    let relationshipsData = []

    //get a market's address and instantiate a new contract to get all work relationships
    const relationshipAddresses = marketContractInstance.getWorkRelationships();
    console.log('This market contains: ' + relationshipAddresses.length + ' relationships');

    //go through the address of each relationship, create the contract and extract the status and metadata pointer;
    //update work db for work relationships
    if (relationshipAddresses.length > 0 && relationshipAddresses != null) {
        for (const relationship in relationshipAddresses) {
            const relationshipContractInstance : Contract = new ethers.Contract(abiMap[Contracts.WORK_RELATIONSHIP], relationship, opportunityService.getProviderInterface());
    
            const contractStatus = relationshipContractInstance.get_contractStatus();
            const contractTaskName = relationshipContractInstance.get_contractTaskName();

            let relationshipData = {
                contractStatus,
                contractTaskName
            }

            relationshipsData.push(relationshipData)
    
            console.log('Processing task with task name: ' + contractTaskName + ' and the status: '  +contractStatus);        
        }
    }

    let marketData = {
        marketAddress,
        marketIndex,
        marketOwner,
        marketName,
        marketType,
        marketRelationships: relationshipAddresses
    }

    opportunityEventEmitter.emit(MarketEvents.MarkedCreated, marketData);

        //update db
        console.log('Updating database for markets and relationships')
        //knex.schema.raw("SET sql_mode='TRADITIONAL'")
}

export { processMarketCreatedEvent };