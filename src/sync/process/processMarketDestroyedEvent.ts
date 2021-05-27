import { Contracts, MarketEvents } from '../../constants';

import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

/**
 * 
 * @param eventData 
 * @returns 
 */
function processMarketDestroyedEvent(eventData) {
    const marketAddress = eventData[1];

}

export { processMarketDestroyedEvent };