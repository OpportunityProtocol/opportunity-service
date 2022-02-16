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

    const marketAddress : String = args[0];
    const marketIndex : String = args[1];
    const marketOwner : String = args[2];
    const marketName : String = args[3];
    const marketType : String = args[4];

    const marketData = {
        marketAddress,
        marketIndex,
        marketOwner,
        marketName,
        marketType,
        marketRelationshipData: []
    }

    opportunityEventEmitter.emit(MarketEvents.MarkedCreated, marketData);
}

export { processMarketCreatedEvent };