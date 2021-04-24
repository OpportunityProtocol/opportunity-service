import opportunityEventEmitter from '../../OpportunityEventEmitter';
import { subscribeToLogEvent, unsubscribeFromLogEvent } from './subscribe-log-event';

const subscribeToEvent = (contractName, contractModule, eventName, rpc) => {
    subscribeToLogEvent(contractName, contractModule, eventName, rpc);
    opportunityEventEmitter.emit(eventName);
}

const unsubscribeFromEvent = (web3, eventName) => {
    unsubscribeFromLogEvent(eventName, web3);
    opportunityEventEmitter.removeAllListeners(eventName);
}

export { subscribeToEvent, unsubscribeFromEvent };