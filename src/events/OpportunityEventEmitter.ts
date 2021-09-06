import { providers } from 'ethers';
import { EventEmitter } from 'events';
import { MarketEvents, ExchangeEvents, UserEvents, RPCEvents, StorageEvents, ServiceEvents } from '../constants';

class OpportunityEventEmitter extends EventEmitter{
    constructor() {
        super();
        this.setMaxListeners(0);
    }

    private subscriptions = [];

    addSubscription(eventName : string, callback : () => any) {
        this.subscriptions[eventName] = callback;
    }

    emit(eventName : string, ...args: Array<any>) : boolean {
        console.log('emitting event name: ' + eventName)
        console.log('args: ' + args)
        return super.emit(eventName, ...args);
    }

    subscribeToEventOnce = (eventName : string, callback : (...args : Array<any>) => any) => {
        this.once(eventName, callback);
    }

    subscribeToEvent = (eventName : string, callback : (...args : Array<any>) => any) => {
        this.on(eventName, callback);

        this.addSubscription(eventName, callback)
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