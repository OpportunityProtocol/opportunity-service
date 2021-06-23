import { Contracts, ExchangeEvents, MarketEvents } from '../../constants';
import * as abiMap from '../../blockchain/abi.json';
import * as addressMap from '../../blockchain/addresses.json';
import opportunityService from '../../OpportunityService';
import { Contract } from '@ethersproject/contracts';
import { ethers } from 'ethers';
import { AbiCoder, EventFragment, Interface, LogDescription, Result } from '@ethersproject/abi';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

/**
 * WorkRelationshipCreated(address owner, address relationship, address market)
 * @param log
 * @returns
 */
function processWorkRelationshipCreatedEvent(log) {
    try {
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.MARKET]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const relationshipOwner = args[0];
    const relationshipAddress = args[1];
    const relationshipMarketAddress = args[2];

    console.log('Processing ' + signature + ' with args: ' 
    + 'Owner: ' + relationshipOwner + ', Address: '  + relationshipAddress + ', and Market Address: ' + relationshipAddress);

    const relationshipContractInstance = new ethers.Contract(relationshipAddress, abiMap[Contracts.WORK_RELATIONSHIP], opportunityService.getSignersInterface())
    const relationshipTaskMetadataPointer = relationshipContractInstance._taskMetadataPointer();
    const relationshipStatus = 0 //relationshipContractInstance.get_contractStatus();

    //process contents of metadata pointer
    let relation//opportunityService.storageProvider.retrieveContent(relationshipTaskMetadataPointer);
    console.log('Unsuccessful fetch of file contents from ipfs');

    let relationshipMetadata = {
        
    }

    let relationshipData = {
        relationshipOwner,
        relationshipAddress,
        relationshipMarketAddress,
        relationshipStatus,
        relationshipMetadata,
    }

    opportunityEventEmitter.emit(ExchangeEvents.WorkRelationshipCreated, relationshipData);
    console.log('Successfully processWorkRElationshipCreated')
} catch(error) {
    console.log('processWOrkRelationshipCreated: ' + error)
}
}

export { processWorkRelationshipCreatedEvent };