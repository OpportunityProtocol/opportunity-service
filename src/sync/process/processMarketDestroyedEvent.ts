import { Contracts, MarketEvents } from '../../constants';

import { knex } from '../../database/index';
import opportunityEventEmitter from '../../events/OpportunityEventEmitter';

/**
 * 
 * @param eventData 
 * @returns 
 */
function processMarketDestroyedEvent(eventData) {
    const marketAddress = eventData[1];
    knex.select().table('markets').where('marketAddress', marketAddress).then(() => {
        opportunityEventEmitter.emit(MarketEvents.MarketDestroyed);
    })
}

export { processMarketDestroyedEvent };