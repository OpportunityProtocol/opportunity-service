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
    const iface : Interface = new ethers.utils.Interface(abiMap[Contracts.WORK_RELATIONSHIP]);
    const decodedLog : LogDescription = iface.parseLog(log);
    const { args, signature } = decodedLog;

    const relationshipOwner = args[0];
    const relationshipAddress = args[1];
    const relationshipMarketAddress = args[2];

    console.log('Processing ' + signature + ' with args: ' 
    + 'Owner: ' + relationshipOwner + ', Address: '  + relationshipAddress + ', and Market Address: ' + relationshipAddress);

    const relationshipContractInstance = new ethers.Contract(relationshipAddress, abiMap[Contracts.WORK_RELATIONSHIP], opportunityService.getSignersInterface())
    const relationshipTaskMetadataPointer = relationshipContractInstance.get_taskMetadataPointer();
    const relationshipStatus = relationshipContractInstance.get_contractStatus();

    //process contents of metadata pointer
    //opportunityService.storageProvider.retrieveContent(relationshipTaskMetadataPointer);
    console.log('Unsuccessful fetch of file contents from ipfs');

    let relationshipMetadata = {
        relationshipStatus
    }

    let relationshipData = {
        relationshipMarketAddress,
        relationshipStatus,
        relationshipMetadata,
    }

    opportunityEventEmitter.emit(ExchangeEvents.WorkRelationshipCreated, relationshipData);
}

export { processWorkRelationshipCreatedEvent };