import { EventEmitter } from 'events';
import { MarketEvents, ExchangeEvents, UserEvents, RPCEvents, StorageEvents } from './constants';

class OpportunityEventEmitter extends EventEmitter {
    public emit(eventName : MarketEvents | ExchangeEvents | UserEvents | RPCEvents | StorageEvents, ...args: Array<any>) : boolean {
        return super.emit(eventName, ...args);
    }
}

const opportunityEventEmitter : EventEmitter = new OpportunityEventEmitter();
export default opportunityEventEmitter;