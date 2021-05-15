import { EventEmitter } from 'events';
import { MarketEvents, ExchangeEvents, UserEvents, RPCEvents, StorageEvents, ServiceEvents } from '../constants';

class OpportunityEventEmitter extends EventEmitter {
    constructor() {
        super();
        this.setMaxListeners(0);
    }

    readonly subscriptions = [];

    addSubscription(id : string, eventName : string, callback : () => any) {}

    emit(eventName : ServiceEvents | MarketEvents | ExchangeEvents | UserEvents | RPCEvents | StorageEvents, ...args: Array<any>) : boolean {
        return super.emit(eventName, ...args);
    }

    subscribeToEventOnce = (eventName : string, callback : (...args : Array<any>) => any) => {
        this.once(eventName, callback);
    }

    subscribeToEvent = (eventName : string, callback : (...args : Array<any>) => any) => {
        this.on(eventName, callback);

        const id = -1;
        this.addSubscription(id, eventName, callback)
    }

    unsubscribeFromAllListeners = () => {
        this.removeAllListeners();
    }

    unsubscribeFromListener = (eventName : string, callback : (...args : Array<any>) => any) => {
        this.removeListener(eventName, callback)
    }
}   

const opportunityEventEmitter = new OpportunityEventEmitter();
export default opportunityEventEmitter;