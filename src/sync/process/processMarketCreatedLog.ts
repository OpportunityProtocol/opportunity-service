import { Contracts, MarketEvents } from '../../constants';
import abiMap from '../../blockchain/abi.json';
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

    let marketData = {
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